# Workspace System Audit & Implementation Plan

## 1. Architectural Inconsistencies

### 1.1 Fragmented Directory Structure (Severe)
The current project structure is severely fragmented between the project root and the `src` folder. Critical components and pages exist at both levels (`/components`, `/pages`, `/layouts`, `/services`, `/data`, `App.tsx`, `types.ts`), while Vite is looking primarily at `src/main.tsx` as an entry point which redirects back into the root `App.tsx`.
*   **Root Level:** `components/`, `pages/`, `layouts/`, `services/`, `data/`, `App.tsx`, `types.ts`
*   **Src Level:** `src/components/`, `src/layouts/`, `src/services/`, `src/data/`, `src/main.tsx`, `src/types.ts`
**Impact:** Causes immense confusion regarding the "source of truth" and risks code divergence. Some imports point to `./`, some to `../`, causing potential cyclic dependencies or duplicate bundles.

### 1.2 Unnecessary Root Files
Files like `jonoAstro.jpg` (~3.1MB) sit untouched in the root instead of the proper `public/media` or `src/assets` folders. Additionally, old files like `app-old.tsx` and duplicated `types.ts` persist.

## 2. Security Vulnerabilities

### 2.1 Gemini API Key Client-Side Exposure (Critical)
The application currently uses `vite.config.ts` to statically inject `env.GEMINI_API_KEY` into the client-side bundle via `process.env.API_KEY` replacement. 
**Vulnerability:** This fully exposes the Gemini AI API Key in plain text in the output JS bundle, allowing any visitor to steal the key and incur uncontrolled billing charges or exploit the quota.
**File Impacted:** `vite.config.ts`, `services/gemini.ts`, `components/apps/MediaLab.tsx`, `components/apps/MotionLab.tsx`

### 2.2 NPM Vulnerabilities (High)
An `npm audit` reveals high-severity dependency vulnerabilities related to `minimatch` and `gaxios`.

## 3. Performance Bottlenecks

### 3.1 Bundle Size and Code Splitting (High)
Without proper React code-splitting (`React.lazy`, `Suspense`), the entire application (including complex AI dashboards, UI components, background video players, and the Gemini API SDK logic) is compiled into a single monolithic bundle, drastically delaying the First Contentful Paint (FCP) and interacting negatively with user experience on mobile networks.

### 3.2 Un-Optimized Media Assets
Images like `jonoAstro.jpg` (3.1MB) outside the build pipeline, and several high-fidelity uncompressed video files being eagerly loaded, drain network bandwidth on page load.

---

## The Implementation Plan

### Phase 1: Security Remediation (Immediate)
1.  **Remove Client-Side Key Injection:** Remove the `define` block mapping `process.env.API_KEY` in `vite.config.ts`.
2.  **Move to API Gateway Proxy:** Refactor `services/gemini.ts` to forward prompts to a server-side endpoint (e.g. Next.js backend, Node/Express proxy, or Cloudflare Worker) rather than communicating directly with the `@google/genai` client-sdk on the frontend layer.
3.  **Run NPM Audit Fix:** Run `npm audit fix` to bump up vulnerable dependencies, then verify build stability.

### Phase 2: Architectural Consolidation (Structural)
1.  **Migrate to /src:** Move ALL source code from the root `/components`, `/pages`, `/layouts`, `/services`, `/data`, `App.tsx`, and `types.ts` directly into the `src/` directory.
2.  **Deduplicate Modules:** Compare the code between `root/components/*` and `src/components/*` to verify there's no lost logic, then permanently delete the duplicate root-level folders.
3.  **Update Imports:** Recursively run a search-and-replace command to fix relative import paths (`../../src...` -> `./...`) across all TypeScript files.
4.  **Update Entry Point:** Move `App.tsx` strictly inside `src/`, modify `src/main.tsx` to point to `./App`, and check `vite.config.ts` resolution.

### Phase 3: Performance Optimization (Enhancement)
1.  **Implement Lazy Loading:** Wrap individual pages (`AppModule.HOME`, `AppModule.OS3_INFO`, `AppModule.MEDIA_LAB`) dynamically inside `App.tsx` using `React.lazy()` and `<Suspense fallback={<LoadingSpinner/>}>`. This will split the single JS bundle into route-specific chunks.
2.  **Media Triage:** Move any floating `.jpg` or static assets into `public/media/` and implement WebP/AVIF compression.
3.  **Tree-Shaking Review:** Run `npm run build` post-reorganization to confirm proper chunk generation, targeting all app chunks under ~500KB.
