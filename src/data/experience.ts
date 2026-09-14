export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Kim CC",
    title: "Software Engineer",
    location: "Bengaluru, India",
    period: "Jul 2026 – Present",
    current: true,
    bullets: [
      "Built Persona training and intent-scoped response strategies end to end: LLM generation pipelines, CRUD APIs, and full create/dashboard/validation UIs, consumed by the Python AI engine, so non-engineers control brand voice and how the AI answers each intent.",
      "Built the AI Operating Settings surface: per-intent filtering toggles over a ported intent classifier, all 9 system guardrails configurable per account with policy assembled from the database, auto thresholds, and a confidence check and stale-response gate deciding when the AI answers and when it escalates.",
      "Delivered multi-brand support across the platform for enterprise accounts running several brands in one workspace: brand management with inbox assignment, server-to-server normalizer APIs resolving each incoming ticket to a brand, and brand-scoped analytics and agent scorecards.",
      "Designed a 6-layer eval cascade for the AI engine with LLM-as-judge scoring and Langfuse telemetry, turning response quality into per-layer metrics that pinpoint which stage produced a bad answer.",
      "Instrumented the engine feature by feature with metrics across guardrails, knowledge base, rule-engine workers and tool runners, and defined the alert rules on top, so each feature alarms on its own failure modes instead of one blanket service alarm.",
      "Surfaced the AI's thinking steps as live progress events from the Python engine through to the agent UI, and added visitor page-trail tracking to live chat so agents can see which pages a customer browsed before opening a ticket.",
      "Integrated Skio, Trustpilot, Klaviyo, Yotpo, Reviews.io, USPS, ShipStation, ShipBob and Google Sheets into the agent tool layer.",
      "Improved the Pulse analytics product with sentiment and per-account tag filters, background CSV exports, and LLM-analysed CX reports emailed as PDF.",
    ],
  },
  {
    company: "Kim CC",
    title: "AI Engineering Intern",
    location: "Bengaluru, India",
    period: "Nov 2025 – Jun 2026",
    bullets: [
      "Lifted AI response accuracy and workflow coverage from 18% to 60% by redesigning extraction logic, retrieval workflows, validation layers, and fallback handling.",
      "Implemented hybrid product search with Qdrant dense and sparse retrieval for Shopify product discovery, taking retrieval accuracy from 20% to 100%.",
      "Developed a graph-based workflow execution engine orchestrating multi-step AI pipelines, tool calls, routing logic, and async task execution.",
      "Shipped webhook ingestion pipelines for Zoho and Gorgias plus a Zoho Desk extension, letting agents generate, review, and send AI-assisted replies inside the helpdesk UI.",
    ],
  },
  {
    company: "DailyWellnessAI",
    title: "AI Engineering Intern",
    location: "Remote (San Diego, CA)",
    period: "Mar 2025 – Aug 2025",
    bullets: [
      "Developed an AI assessment tool using the OpenAI SDK with Structured Output to evaluate free-form Q&A and recommend tailored service packages.",
      "Cut agent processing latency from 90s to 30s by introducing threading for concurrent tool calls and batching where possible.",
      "Orchestrated deployment with FastAPI, Docker, and AWS EC2, compressing images from 1GB to 158MB and establishing CI/CD.",
    ],
  },
  {
    company: "GST Magic AI",
    title: "Freelance AI Engineer",
    location: "Remote",
    period: "Aug 2025 – Sep 2025",
    bullets: [
      "Engineered a document management tool for GST PDFs with embedded metadata, supporting search, edit, and status tracking, persisted to Pinecone.",
      "Deployed a RAG-based assistant on the Pinecone Assistant API and improved retrieval relevance through metadata augmentation.",
    ],
  },
  {
    company: "Mermory",
    title: "Freelance AI Engineer",
    location: "Remote (U.S.)",
    period: "Oct 2024 – Nov 2024",
    bullets: [
      "Executed a generative flashcard pipeline using LLaMA 3.1 and FastAPI to create cloze-deletion and Q&A flashcards.",
      "Designed an occlusion-based approach with OpenCV and NumPy to auto-generate labelled diagram study aids.",
      "Created a styled image generation tool with diffusion models fine-tuned via DreamBooth, alongside GANs.",
    ],
  },
];

export const education = {
  school: "Ajay Kumar Garg Engineering College",
  degree: "B.Tech, Computer Science",
  period: "Nov 2022 – Jun 2026",
  detail: "8.55 CGPA · 2nd rank in department",
  location: "Ghaziabad, Uttar Pradesh",
};
