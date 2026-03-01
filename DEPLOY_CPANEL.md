# Deploy jb3ai-os3 from GitHub to cPanel

This repo auto-deploys to cPanel on every push to `main` using GitHub Actions.

## Required GitHub Secrets
Add these in **GitHub repo → Settings → Secrets and variables → Actions**:

- `CPANEL_FTP_SERVER` (example: `ftp.jb3ai.com`)
- `CPANEL_FTP_USERNAME` (example: `database1@jb3ai.com`)
- `CPANEL_FTP_PASSWORD`
- `CPANEL_TARGET_DIR` (example: `/public_html/os3/`)

## Workflow
- File: `.github/workflows/deploy-cpanel.yml`
- Trigger: push to `main` and manual dispatch
- Process: `npm ci` → `npm run build` → upload `dist/` to `CPANEL_TARGET_DIR`

## Notes
- Ensure `CPANEL_TARGET_DIR` points to the exact folder you want live.
- For root site deploys, use `/public_html/` with caution.
