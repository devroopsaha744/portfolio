export const about = {
  /** Left column — the engineer. */
  professional: [
    "I'm an AI engineer who likes the unglamorous half of the job: the retrieval that returns the right chunk, the guardrail that catches the bad reply before a customer sees it, the Docker image that went from 1GB to 158MB because someone actually looked.",
    "Most of my work lives in production LLM systems — RAG pipelines, multi-step agents, graph-based workflow engines, hybrid search. Right now I'm at Kim CC in Bengaluru, where I took an AI support platform from handling 18% of workflows to 60%, and pushed product-search accuracy from 20% to 95% with dense + sparse retrieval on Qdrant.",
    "Before that: an AI assessment tool at DailyWellnessAI (and a 90s → 30s latency cut that I enjoyed far too much), freelance RAG work on GST documents, and a generative flashcard pipeline. I also write about all of it on Medium, because explaining a thing is how I find out whether I understood it.",
  ],
  /** Right column — the human. */
  personal: [
    "Off the clock, I am almost entirely a football problem.",
    "Lionel Messi is the GOAT. This is not a debate I'm hosting, it's a fact I'm announcing. I've watched grown men argue about trophies and nations and *eras* and none of it survives thirty seconds of him picking up the ball on the right touchline and deciding the game is over now. Barça is home — the good years, the very bad years, the ones where I had no business staying up until 1:30am for a league game and did it anyway.",
    "If I'm not writing code, the odds are extremely high that I'm watching football. Not even good football, necessarily. A mid-table game on a wet Tuesday will do. My weekends are scheduled around kick-off times and I've made peace with it.",
    "Outside of that: *The Dark Knight* is my favourite film and I'll rewatch it at the smallest provocation — it's the rare blockbuster that respects you enough to be about something. I grind LeetCode (300+ and counting, though the counter matters less than the fact I stopped being scared of DP). And I write, mostly to force my own thinking into a straight line.",
  ],
  stats: [
    { value: "300+", label: "LeetCode solved" },
    { value: "8", label: "Medium articles" },
    { value: "3", label: "Hackathon finishes" },
    { value: "59", label: "Public repos" },
  ],
} as const;
