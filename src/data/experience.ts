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
    title: "AI Engineering Intern",
    location: "Bengaluru, India",
    period: "Nov 2025 — Present",
    current: true,
    bullets: [
      "Lifted AI response accuracy and workflow coverage from 18% to 60% by redesigning extraction logic, retrieval workflows, validation layers, and fallback handling.",
      "Implemented hybrid product search with Qdrant dense + sparse retrieval for Shopify product discovery, taking retrieval accuracy from 20% to 95%.",
      "Built a graph-based workflow execution engine orchestrating multi-step AI pipelines, tool calls, routing logic, and async task execution.",
      "Shipped webhook ingestion pipelines integrating Zoho and Gorgias, enabling automated email-to-AI response workflows for support tickets.",
      "Designed a Zoho Desk extension letting support agents generate, review, and send AI-assisted replies inside the helpdesk UI.",
      "Built input/output AI guardrails to enforce safety constraints and selectively block automated replies in production.",
    ],
  },
  {
    company: "DailyWellnessAI",
    title: "AI Engineering Intern",
    location: "Remote — San Diego, CA",
    period: "Mar 2025 — Aug 2025",
    bullets: [
      "Developed an AI assessment tool using the OpenAI SDK with Structured Output to evaluate free-form Q&A and recommend tailored service packages.",
      "Cut agent processing latency from 90s to 30s by introducing threading for concurrent tool calls and batching where possible.",
      "Orchestrated deployment with FastAPI, Docker, and AWS EC2 — compressed images from 1GB to 158MB and established CI/CD.",
    ],
  },
  {
    company: "GST Magic AI",
    title: "Freelance AI Engineer",
    location: "Remote",
    period: "Aug 2025 — Sep 2025",
    bullets: [
      "Engineered a document management tool for GST PDFs with embedded metadata, supporting search, edit, and status tracking, persisted to Pinecone.",
      "Deployed a RAG-based assistant on the Pinecone Assistant API and improved retrieval relevance through metadata augmentation.",
    ],
  },
  {
    company: "Mermory",
    title: "Freelance AI Engineer",
    location: "Remote — U.S.",
    period: "Oct 2024 — Nov 2024",
    bullets: [
      "Executed a generative flashcard pipeline using LLaMA 3.1 and FastAPI to create cloze-deletion and Q&A flashcards.",
      "Designed an occlusion-based approach with OpenCV and NumPy to auto-generate labelled diagram study aids.",
    ],
  },
];

export const education = {
  school: "Ajay Kumar Garg Engineering College",
  degree: "B.Tech, Computer Science",
  period: "Nov 2022 — Jun 2026",
  detail: "8.55 CGPA · 2nd rank in department",
  location: "Ghaziabad, Uttar Pradesh",
};
