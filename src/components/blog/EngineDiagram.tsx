type Step = {
  n: string;
  title: string;
  body: string;
  kind?: "s1" | "s2";
};

const STEPS: Step[] = [
  { n: "1", title: "Position", body: "The current board, plus whose turn it is, castling rights and en passant." },
  {
    n: "2",
    title: "Rules: every legal move",
    body: "A chess library lists the legal moves. Laya never has to guess what's allowed, so it can't play an illegal move.",
  },
  {
    n: "3",
    title: "Laya, one question per move",
    body: "“White plays Nf3 (knight g1-f3). Win chance for white?” Ten answer levels, 0-10% up to 90-100%. One forward pass per question, no text generated.",
    kind: "s1",
  },
  {
    n: "4",
    title: "A win chance for every move",
    body: "The answer distribution is averaged into a single number. Played alone, the engine would just pick the highest one.",
    kind: "s1",
  },
  {
    n: "5",
    title: "Search (Monte Carlo tree search)",
    body: "Laya's numbers decide which moves to explore first and how good each position looks. The search plays the most promising lines forward, sends every new position back to step 3, and keeps checkmates and draws exact from the rules.",
    kind: "s2",
  },
  { n: "6", title: "The move", body: "The move the search visited most. Its tree is reused on the next turn." },
];

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 24" className="mx-auto my-1.5 h-6 w-4 text-faint">
      <path d="M8 2v18M3 15l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ kind }: { kind: "s1" | "s2" }) {
  return kind === "s1" ? (
    <span className="rounded-full border border-garnet/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-garnet-lit">
      System 1 · intuition
    </span>
  ) : (
    <span className="rounded-full border border-blau-lit/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blau-lit">
      System 2 · calculation
    </span>
  );
}

/** How a position turns into a move in LayaChess. */
export function EngineDiagram() {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <ol className="mx-auto max-w-xl">
          {STEPS.map((step, i) => (
            <li key={step.n}>
              <div
                className={`rounded-xl border p-4 ${
                  step.kind === "s1"
                    ? "border-garnet/50 bg-garnet/[0.06]"
                    : step.kind === "s2"
                      ? "border-blau-lit/50 bg-blau/[0.08]"
                      : "border-line bg-surface-2"
                }`}
              >
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-faint">{step.n}</span>
                  <span className="text-[15px] font-semibold text-fg">{step.title}</span>
                  {step.kind ? <Badge kind={step.kind} /> : null}
                </div>
                <p className="text-[14px] leading-relaxed text-muted">{step.body}</p>
              </div>
              {i < STEPS.length - 1 ? <Arrow /> : null}
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-5 grid max-w-xl gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-dashed border-line-strong p-3.5">
            <p className="mb-1 text-[13px] font-semibold text-fg">Opening book (optional)</p>
            <p className="text-[13px] leading-relaxed text-muted">
              Plays known opening moves first, then hands over to Laya once the game leaves the book.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-line-strong p-3.5">
            <p className="mb-1 text-[13px] font-semibold text-fg">Stockfish (comparison only)</p>
            <p className="text-[13px] leading-relaxed text-muted">
              Shown next to Laya on the board so you can see when they agree. It never picks Laya&apos;s moves.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-faint">
        How LayaChess turns a position into a move.
      </figcaption>
    </figure>
  );
}
