export type Project = {
  /** GitHub repo name — also the key used to refresh star counts at build time. */
  repo: string;
  name: string;
  blurb: string;
  stack: string[];
  github: string;
  demo?: { label: string; url: string };
  /** Baked-in fallback, refreshed from the GitHub API at build time. */
  stars: number;
  language: string;
  /** Accent used for the card's corner glow. */
  accent: "garnet" | "blau" | "gold";
};

export const projects: Project[] = [
  {
    repo: "julius_ai",
    name: "Julius AI",
    blurb:
      "An AI interviewer that actually conducts the interview. A voice agent runs a 6-stage conversational screen, then hands you a curated coding challenge, then evaluates both and makes a hiring recommendation. The hard part was latency: 800ms end-to-end over WebSockets with Deepgram STT and ElevenLabs TTS, because anything slower stops feeling like a conversation.",
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "Deepgram", "ElevenLabs"],
    github: "https://github.com/devroopsaha744/julius_ai",
    demo: { label: "Watch demo", url: "https://youtu.be/gQ2PJVzWenE" },
    stars: 1,
    language: "TypeScript",
    accent: "garnet",
  },
  {
    repo: "TexMCP",
    name: "TexMCP",
    blurb:
      "A FastMCP microservice that renders LaTeX to PDF, exposed as MCP tools so any model-context-protocol client — Claude Desktop included — can typeset documents on demand. Small, boring, and it does exactly one thing properly.",
    stack: ["Python", "FastMCP", "LaTeX", "MCP"],
    github: "https://github.com/devroopsaha744/TexMCP",
    stars: 11,
    language: "Python",
    accent: "blau",
  },
  {
    repo: "fastapi-scaffold",
    name: "fastapi-scaffold",
    blurb:
      "A CLI that generates a FastAPI project the way you'd actually structure one — optional auth, database wiring, ML model setup, Docker. Published on PyPI and installed by people I've never met, which is still the most satisfying metric I have.",
    stack: ["Python", "FastAPI", "CLI", "Docker", "PyPI"],
    github: "https://github.com/devroopsaha744/fastapi-scaffold",
    demo: { label: "View on PyPI", url: "https://pypi.org/project/fastapi-scaffold/" },
    stars: 10,
    language: "Python",
    accent: "gold",
  },
  {
    repo: "YogaFix",
    name: "YogaFix",
    blurb:
      "Real-time yoga pose detection and correction. Frames are captured server-side, run through MediaPipe pose estimation, and feedback streams back over WebSockets fast enough to correct you mid-pose rather than after it.",
    stack: ["Python", "OpenCV", "MediaPipe", "FastAPI", "WebSockets"],
    github: "https://github.com/devroopsaha744/YogaFix",
    demo: {
      label: "Watch demo",
      url: "https://www.youtube.com/playlist?list=PLevupJ4B1q4Mn3YHLnyD1Q8_3HtMfyegf",
    },
    stars: 3,
    language: "Python",
    accent: "blau",
  },
  {
    repo: "FitVid",
    name: "FitVid",
    blurb:
      "An AI-powered visual gym: it watches your exercise form, counts reps, and tells you when your last three were rubbish. Computer vision aimed at the specific problem of training alone with nobody to correct you.",
    stack: ["Python", "Computer Vision", "MediaPipe", "OpenCV"],
    github: "https://github.com/devroopsaha744/FitVid",
    demo: {
      label: "Read the write-up",
      url: "https://medium.com/@datafreakai/fitvid-ai-powered-visual-gym-42336427f5c1",
    },
    stars: 2,
    language: "Jupyter Notebook",
    accent: "garnet",
  },
  {
    repo: "Elevate",
    name: "Elevate",
    blurb:
      "Disk scheduling algorithms — FCFS, SSTF, SCAN, LOOK and their circular variants — explained through the analogy of elevators in a building, and animated with Manim. Built because reading the pseudocode never made it click, and watching it move did.",
    stack: ["Python", "Manim", "Operating Systems", "Algorithms"],
    github: "https://github.com/devroopsaha744/Elevate",
    demo: {
      label: "Read the write-up",
      url: "https://medium.com/@datafreakai/from-disks-to-elevators-applying-scheduling-algorithms-for-optimal-movement-8784fa0ea9e8",
    },
    stars: 1,
    language: "Jupyter Notebook",
    accent: "gold",
  },
];
