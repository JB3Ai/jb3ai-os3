
import { AppModule } from '../types';

export const PAGE_METADATA: Record<AppModule, { title: string; description: string; robots?: string; path?: string }> = {
  [AppModule.HOME]: {
    title: "JB³Ai | Managed AI Operating System for Business",
    description: "A unified operating environment for intelligence, production, and security. OS³ Dash brings clarity, control, and governed access to modern work.",
    path: ""
  },
  [AppModule.OS3_INFO]: {
    title: "OS³ Dash | A Managed Operating Environment",
    description: "OS³ Dash is a unified system for business intelligence, media production, and secure access. Designed for clarity, governance, and scale.",
    path: "os3"
  },
  [AppModule.APPS_LIST]: {
    title: "Applications | JB³Ai",
    description: "Explore JB³Ai applications integrated into OS³ Dash, including Investigator AI, Shield AI, and MindCare AI.",
    path: "apps"
  },
  [AppModule.SERVICES_HUB]: {
    title: "Services | JB³Ai",
    description: "Consulting, automation, and advisory services to design, deploy, and govern intelligent systems.",
    path: "services"
  },
  [AppModule.INVESTIGATOR_AI]: {
    title: "Investigator AI | JB³Ai Application",
    description: "Deep-search forensic tool for internal data discovery and trend synthesis across silos.",
    path: "apps/investigator-ai"
  },
  [AppModule.SHIELD_AI]: {
    title: "Shield AI | JB³Ai Application",
    description: "Real-time governance monitoring and automated compliance reporting for all AI outputs.",
    path: "apps/shield-ai"
  },
  [AppModule.MINDCARE_AI]: {
    title: "MindCare AI | JB³Ai Application",
    description: "Supportive intelligence layer for team wellness and cognitive load optimization in high-stakes environments.",
    path: "apps/mindcare-ai"
  },
  [AppModule.CONSULTING]: {
    title: "Consulting | JB³Ai Services",
    description: "Strategic advisory services to design, deploy, and govern intelligent systems.",
    path: "services/consulting"
  },
  [AppModule.ACCELERATOR]: {
    title: "Accelerator | JB³Ai Services",
    description: "A high-speed development framework for building and deploying custom internal OS extensions.",
    path: "services/accelerator"
  },
  [AppModule.CONTACT]: {
    title: "Contact | JB³Ai",
    description: "Request technical briefings and engage with the JB³Ai advisory team.",
    path: "contact"
  },
  [AppModule.BROCHURES]: {
    title: "Library | JB³Ai",
    description: "Access detailed product brochures and technical documentation.",
    path: "brochures"
  },
  [AppModule.VIDEO_VAULT]: {
    title: "VVault | JB³Ai",
    description: "Video vault with product demos, instructional content, and project showcases.",
    path: "vvault"
  },
  [AppModule.WORKSPACE]: {
    title: "OS³ Dash Demo | JB³Ai",
    description: "Demonstration environment for OS³ Dash. Access is gated and governed.",
    path: "demo",
    robots: "noindex, nofollow"
  },
  [AppModule.DEMO_SIGNUP]: {
    title: "Demo Access Request | JB³Ai",
    description: "Request controlled JB3Ai demo access and continue to the appropriate workspace.",
    path: "demo/register",
    robots: "noindex, nofollow"
  },
  [AppModule.NEURAL_CORE]: {
    title: "Neural Core | JB³Ai",
    description: "Central intelligence sync and neural processing unit for OS³ Dash.",
    robots: "noindex, nofollow"
  },
  [AppModule.MEDIA_LAB]: {
    title: "Media Lab | JB³Ai",
    description: "High-fidelity institutional asset rendering and media synthesis.",
    robots: "noindex, nofollow"
  },
  [AppModule.PHONE_SYSTEM]: {
    title: "OS³ Voice Grid | JB³Ai",
    description: "The intelligent enterprise voice layer transforming calls into structured intelligence. Built for scale, security, and governed execution.",
    robots: "noindex, nofollow",
    path: "apps/voice-grid"
  },
  [AppModule.VOICE_GRID]: {
    title: "Voice Grid Console | JB³Ai",
    description: "Internal Voice Grid execution console for sandboxed voice qualification sessions.",
    robots: "noindex, nofollow",
    path: "demo/voice-grid"
  },
  [AppModule.MOTION_LAB]: {
    title: "Motion Lab | JB³Ai",
    description: "VEO Loop Engine for institutional motion asset synthesis.",
    robots: "noindex, nofollow"
  },
  [AppModule.CLIENT_ZONE]: {
    title: "Client Zone | JB³Ai",
    description: "Secure client portal for institutional workspace management.",
    robots: "noindex, nofollow"
  },
  [AppModule.TRUST]: {
    title: "Trust & Integrity | JB³Ai",
    description: "Foundational principles of verifiable trust and engineered integrity in AI systems."
  },
  [AppModule.GOVERNANCE]: {
    title: "Governance | JB³Ai",
    description: "Operational governance frameworks for controlled intelligence environments."
  },
  [AppModule.SECURITY]: {
    title: "Security | JB³Ai",
    description: "Zero-trust architecture and security protocols protecting intelligence assets."
  },
  [AppModule.COMPLIANCE]: {
    title: "Compliance | JB³Ai",
    description: "Regulatory alignment and standards adherence for automated systems."
  }
};

export const PRODUCT_CONTENT: Record<string, any> = {
  [AppModule.INVESTIGATOR_AI]: {
    label: "Forensic Intelligence & Cross-Silo Discovery",
    headline: "INVESTIGATOR AI",
    subheading: "Forensic intelligence for complex decisions.",
    description: "Investigator AI is a high-fidelity intelligence system designed to surface truth across fragmented data environments. It synthesises structured and unstructured information from documents, communications, financial records, operational logs, and external sources into a single governed investigative view.\n\nBuilt for environments where accuracy, traceability, and evidentiary integrity are non-negotiable, Investigator AI supports deep analysis without automation overreach. Every output is auditable, explainable, and designed to support human judgment, not replace it.",
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "Cross-silo data synthesis and correlation",
      "Timeline reconstruction and entity mapping",
      "Pattern detection across communications, finance, and records",
      "Human-in-the-loop validation for every output",
      "Full audit trail and response provenance"
    ],
    whoItIsFor: "Investigator AI is used by executives, legal teams, risk professionals, investigators, compliance officers, and organisations conducting due diligence, internal reviews, dispute analysis, or complex operational investigations.",
    governanceNote: "All outputs are policy-governed, traceable, and verifiable. Investigator AI does not fabricate conclusions and does not operate without human oversight.",
    ctaPrimary: "LAUNCH INVESTIGATOR DEMO",
    ctaSecondary: "REQUEST DUE DILIGENCE PACK"
  },
  [AppModule.SHIELD_AI]: {
    label: "Governance, Monitoring & Operational Control",
    headline: "SHIELD AI",
    subheading: "The governance layer for intelligent systems.",
    description: "Shield AI is the policy, security, and operational control backbone of the OS³ platform. It governs how intelligence systems operate, how data is accessed, and how outputs are monitored in real time. Shield AI enforces institutional rules, detects risk conditions, and ensures every system action aligns with defined governance, compliance, and security frameworks.\n\nOperating continuously in the background, Shield AI provides organisations with confidence that intelligence is deployed responsibly, predictably, and within approved boundaries. It enables scale without sacrificing control.",
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "Policy-based access control and enforcement",
      "Continuous monitoring and anomaly detection",
      "Identity provider synchronisation",
      "Real-time risk alerts and audit logging",
      "Zero-trust and zero-knowledge architectural support"
    ],
    whoItIsFor: "Shield AI is designed for enterprises, regulated industries, security teams, IT leadership, and legal or compliance functions that require governed intelligence at scale.",
    governanceNote: "Shield AI does not replace decision-makers. It ensures decisions occur within approved operational and ethical boundaries.",
    ctaPrimary: "VIEW GOVERNANCE DEMO",
    ctaSecondary: "REQUEST SECURITY BRIEF"
  },
  [AppModule.MINDCARE_AI]: {
    label: "Cognitive Load & Team Resilience Intelligence",
    headline: "MINDCARE AI",
    subheading: "Intelligence that protects the people operating the system.",
    description: "MindCare AI focuses on cognitive load, decision fatigue, and operational stress within high-performance teams. It provides visibility into workload patterns, information pressure, and system-driven strain, helping organisations design healthier, more sustainable intelligence operations without compromising output quality, speed, or accountability.\n\nRather than monitoring individuals, MindCare AI analyses system-level signals that affect human decision quality. The result is a governed wellbeing intelligence layer that supports clarity, resilience, and long-term performance in complex operational environments.",
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "Cognitive load and workflow stress indicators",
      "Team-level insight without personal surveillance",
      "Decision-quality optimisation signals",
      "Burnout risk trend analysis",
      "Governance-aligned wellbeing intelligence"
    ],
    whoItIsFor: "MindCare AI is used by leadership teams, founders, operations managers, and organisations scaling complex systems where human decision quality is mission-critical.",
    governanceNote: "MindCare AI does not diagnose individuals and does not perform personal monitoring. All insights are aggregated, anonymized, and governance-controlled.",
    governanceLabel: "Ethical Boundary",
    ctaPrimary: "EXPLORE MINDCARE DEMO",
    ctaSecondary: "REQUEST MINDCARE OVERVIEW"
  },
  [AppModule.PHONE_SYSTEM]: {
    label: "The Intelligent Enterprise Voice Layer",
    headline: "OS³ VOICE GRID",
    subheading: "Transforms voice communication into a structured intelligence system.",
    description: "OS³ Voice Grid sits between Shield AI (security), OS³ Dash (command), and the Neural Core (execution). It replaces manual calling processes with a secure, automated execution engine designed for scale.\n\nBuilt on the same neural architecture powering the Mzansi Sales Qualifying Bot (Mazanzi), every call becomes structured data, and every interaction becomes a signal. Traditional phone systems handle calls; OS³ Voice Grid handles outcomes.",
    capabilitiesTitle: "Core Capabilities",
    capabilities: [
      "Intelligent Lead Qualification: Automated outbound/inbound flows using AI voice personas",
      "Multi-Language Intelligence: English, Afrikaans, Zulu, Xhosa, Sepedi",
      "Execution Pipeline: Scheduled call orchestration tied to lead feeds",
      "Intelligence Ledger: Full transcripts, translations, signal tagging, and audit logs",
      "Compliance Gate: POPIA acknowledgment before execution"
    ],
    whoItIsFor: "Organisations that need to identify buying intent, urgency signals, qualification status, and drop-off risk—then feed that data directly back into OS³ Dash for structured action.",
    governanceNote: "Built for South Africa with strict POPIA compliance gates. All voice data is governed, auditable, and secure within the OS³ kernel.",
    governanceLabel: "Compliance & Security",
    ctaPrimary: "LAUNCH VOICE GRID DEMO",
    ctaSecondary: "REQUEST EXECUTION BRIEF"
  }
};

export const SHARED_TRUST_LINE = "All applications operate within the OS³ unified kernel, governed by Shield AI, with full auditability, access control, and deployment integrity enforced at system level.";

export const getStructuredData = (module: AppModule) => {
  const baseData = {
    "@context": "https://schema.org",
  };

  const os3SoftwareApplication = {
    ...baseData,
    "@type": "SoftwareApplication",
    "name": "OS³ Dash",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI operating system for business. Automates workflows, integrates systems, and delivers real-time intelligence.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumb = (items: { name: string; item: string }[]) => ({
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `https://jb3ai.com/${it.item}`
    }))
  });

  const schemas: any[] = [];

  if (module === AppModule.HOME) {
    schemas.push({
      ...baseData,
      "@type": "WebSite",
      "name": "JB³Ai",
      "url": "https://jb3ai.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://jb3ai.com/?search={query}",
        "query-input": "required name=query"
      }
    });
    schemas.push(os3SoftwareApplication);
  }

  if (module === AppModule.OS3_INFO) {
    schemas.push(os3SoftwareApplication);
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "OS³ Dash", item: "os3" }]));
  }

  if (module === AppModule.APPS_LIST) {
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "Applications", item: "apps" }]));
  }

  if (module === AppModule.SERVICES_HUB) {
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "Services", item: "services" }]));
  }

  const appModules = [AppModule.INVESTIGATOR_AI, AppModule.SHIELD_AI, AppModule.MINDCARE_AI, AppModule.PHONE_SYSTEM];
  if (appModules.includes(module)) {
    const meta = PAGE_METADATA[module];
    if (module === AppModule.INVESTIGATOR_AI) {
      schemas.push({
        ...baseData,
        "@type": "SoftwareApplication",
        "name": "InvestigatorAi",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Web",
        "description": "AI-powered due diligence and risk intelligence platform for identity resolution and continuous monitoring."
      });
    } else {
      schemas.push({
        ...baseData,
        "@type": "SoftwareApplication",
        "name": meta.title.split(' | ')[0],
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": meta.description
      });
    }
    schemas.push(breadcrumb([
      { name: "Home", item: "" },
      { name: "Applications", item: "apps" },
      { name: meta.title.split(' | ')[0], item: meta.path || "" }
    ]));
  }

  const svcModules = [AppModule.CONSULTING, AppModule.ACCELERATOR];
  if (svcModules.includes(module)) {
    const meta = PAGE_METADATA[module];
    schemas.push(breadcrumb([
      { name: "Home", item: "" },
      { name: "Services", item: "services" },
      { name: meta.title.split(' | ')[0], item: meta.path || "" }
    ]));
  }

  return schemas;
};
