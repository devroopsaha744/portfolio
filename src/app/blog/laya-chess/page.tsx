import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { EngineDiagram } from "@/components/blog/EngineDiagram";
import { YouTube } from "@/components/blog/YouTube";
import { formatDate, getBlogPost } from "@/data/blog";
import { asset } from "@/lib/paths";

const post = getBlogPost("laya-chess");
const SITE_URL = "https://devroopsaha744.github.io/portfolio";

export const metadata: Metadata = {
  title: `${post.title} | Devroop Saha`,
  description: post.summary,
  openGraph: {
    type: "article",
    url: `${SITE_URL}/blog/${post.slug}/`,
    title: post.title,
    description: post.summary,
    publishedTime: post.date,
    images: [{ url: `${SITE_URL}/blog/laya-chess/og.jpg`, width: 1200, height: 630, alt: post.coverAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.summary,
    images: [`${SITE_URL}/blog/laya-chess/og.jpg`],
  },
};

const BOARD_TEXT = `{"to_move": "black",
 "white": "Kg1 Qc5 Rd1 Rf1 Bc4 Pf2 Pg2 Ph2 Pe3 Pb4 Pa5",
 "black": "Kg8 Qe5 Rg6 Re8 Nd5 Pa6 Pc6 Ph6 Pb7 Pf7 Pg7",
 "castling": "-", "en_passant": "-"}

question: black plays Rg4 (rook g6-g4). Win chance for black?
options:  0-10% | 10-20% | 20-30% | ... | 90-100%`;

export default function LayaChessPost() {
  return (
    <>
      {/* Standalone reading page (opened in a new tab from the Writing section): no section nav. */}
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-lg uppercase tracking-widest text-fg transition-colors hover:text-garnet-lit"
          >
            Devroop<span className="text-garnet">.</span>
          </Link>
          <Link href="/#writing" className="text-sm text-muted transition-colors hover:text-fg">
            More writing
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
        <header className="mb-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-garnet">Experiment · version 1</p>
          <h1 className="font-display text-4xl uppercase leading-[0.98] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I gave a fast, intuitive AI model a chessboard to see how far it would get. This is version 1 of
            the experiment, and I&apos;ll be releasing improvements soon.
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read · Devroop Saha
          </p>
        </header>

        <figure className="mb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(post.cover)}
            alt={post.coverAlt}
            className="w-full rounded-2xl border border-line"
          />
          <figcaption className="mt-3 text-[13px] leading-relaxed text-faint">
            LayaChess running locally. Laya has just left the opening book and picked Nxe4 itself. On the right:
            its win chance for each candidate move, and Stockfish quietly preferring d6.
          </figcaption>
        </figure>

        <article className="article">
          <h2>Two ways of thinking</h2>
          <p>
            Psychologists like to split thinking into two modes. <strong>System 1</strong> is fast and intuitive:
            you glance at something and just know. <strong>System 2</strong> is slow and deliberate: you sit down
            and work it out step by step.
          </p>
          <p>
            Most of the AI everyone talks about right now leans towards System 2. Language models write out their
            reasoning one token at a time. But there&apos;s a quieter family of models built for the other mode, usually
            called <strong>decision models</strong>. You give one a situation and a question with some options, and in a
            single pass it gives you a probability for each option. No text, no chain of thought, just a judgement.
          </p>
          <p>Two of them caught my attention:</p>
          <ul>
            <li>
              <strong>Jev</strong> by TypeSafe AI, a closed API (fittingly, its endpoint is called{" "}
              <code>systemone</code>).
            </li>
            <li>
              <strong>Laya</strong> by Convai Innovations, open source under Apache 2.0, built on a 421M-parameter
              ModernBERT-large encoder, and designed to be fine-tuned.
            </li>
          </ul>
          <p>
            I went with Laya, because I could train it (and because I didn&apos;t have a Jev API key).
          </p>
          <p>
            Chess felt like the perfect test. Strong players use both systems: intuition shortlists a handful of
            moves almost instantly, and calculation checks them. So the experiment was simple to state. Make Laya
            the intuition, give it a search algorithm for the calculation, and see what kind of chess comes out.
          </p>

          <h2>See it play</h2>
          <p>
            Here&apos;s a short demo of the current version running on my laptop: a few moves from the opening book,
            then Laya taking over and playing on its own, with Stockfish&apos;s opinion shown alongside.
          </p>
          <YouTube
            id="bPpAlWArs7E"
            title="LayaChess demo: a System 1 decision model playing chess"
            caption="LayaChess, version 1, running locally."
          />

          <h2>How the engine works</h2>
          <p>
            Laya never sees the rules of chess, and it never has to. The engine around it handles the rules, and
            Laya only answers the one thing it&apos;s good at: how good does this option look?
          </p>

          <EngineDiagram />

          <p>
            Each question looks roughly like this. The board goes in as plain text (piece lists turned out to work
            better than drawing an 8x8 grid), followed by the move being judged:
          </p>
          <pre>
            <code>{BOARD_TEXT}</code>
          </pre>
          <p>
            Laya spreads its confidence over the ten levels, I take the average, and that becomes the move&apos;s
            win chance. Doing this for every legal move gives the engine its intuition: a ranked shortlist.
          </p>
          <p>
            The search is Monte Carlo tree search, the same family of algorithm that AlphaZero and Leela Chess Zero
            use. It takes Laya&apos;s shortlist, plays the most promising lines a few moves ahead, asks Laya about every
            new position it reaches, and settles on the move that holds up best. Checkmate, stalemate and draws by
            repetition always come from the rules, never from the model&apos;s opinion.
          </p>
          <p>
            Around that sit the usual engine pieces: an optional opening book for the first few moves, the standard
            UCI protocol so it plugs into chess apps, and a small browser board for playing it. The board also shows
            what Stockfish would have played in each position. That&apos;s purely there for comparison; Stockfish never
            chooses Laya&apos;s moves.
          </p>

          <h2>How it differs from other chess engines</h2>
          <p>
            Every chess engine is some mix of two things: a way to judge a position (the evaluation) and a way to look
            ahead (the search). The big differences between engines come from how much they lean on each.
          </p>
          <h3>Classical engines: minimax and alpha-beta</h3>
          <p>
            The traditional approach, used from Deep Blue through to older versions of Stockfish, is a tree search
            called <strong>minimax</strong>: try every move, every reply, every reply to that, and assume both sides
            always pick their best option. The tree explodes quickly, so engines use <strong>alpha-beta pruning</strong>{" "}
            to skip branches that provably can&apos;t change the result, plus many tricks on top (move ordering, iterative
            deepening, caching positions they&apos;ve already seen). At the bottom of the tree they score the position
            with a hand-written formula: material, king safety, pawn structure and so on. The evaluation is simple and
            very fast, and the strength comes from looking at enormous numbers of positions.
          </p>
          <h3>Modern Stockfish: alpha-beta plus NNUE</h3>
          <p>
            Today&apos;s Stockfish keeps the alpha-beta search but replaced the hand-written formula with{" "}
            <strong>NNUE</strong>, a small neural network designed to run extremely fast on a normal CPU. Only a few of its
            inputs change when a piece moves, so it can be updated incrementally instead of recomputed from scratch. The result
            is a learned evaluation that still lets the engine search millions of positions per second.
          </p>
          <h3>AlphaZero and Leela Chess Zero: a big network plus tree search</h3>
          <p>
            AlphaZero, and its open-source successor <strong>Leela Chess Zero (Lc0)</strong>, flipped the balance. They
            use a large neural network that looks at the board and outputs two things at once: how promising each move
            is, and how good the position is. That network learned chess by playing millions of games against itself.
            Instead of alpha-beta, they use <strong>Monte Carlo tree search</strong>, which spends its time on the moves
            the network likes. They look at far fewer positions than Stockfish, thousands to tens of thousands per
            second on a GPU, but each one is judged much more cleverly.
          </p>
          <h3>Searchless models: no look-ahead at all</h3>
          <p>
            DeepMind&apos;s searchless chess models go to the extreme: a transformer trained on Stockfish&apos;s judgements
            that picks a move from the current position alone, with no search. It works surprisingly well when the
            model is big and the data is huge, but it can&apos;t double-check a tactic it doesn&apos;t immediately see.
          </p>
          <h3>Where LayaChess sits</h3>
          <p>
            LayaChess borrows from both of the last two. Like DeepMind&apos;s models, it judges each move by the win chance
            after playing it, trained on Stockfish&apos;s labels. Like Leela, it puts Monte Carlo tree search on top so it
            can look ahead. The difference is the brain itself:
          </p>
          <ul>
            <li>
              <strong>It wasn&apos;t built for chess.</strong> Leela&apos;s and DeepMind&apos;s networks are designed around the
              board. Laya is a general System 1 decision model, and the board reaches it as a text question it answers
              in its usual format.
            </li>
            <li>
              <strong>It judges one move at a time.</strong> Leela scores every move in one pass. Laya needs a separate
              pass for each legal move, around 35 per position.
            </li>
            <li>
              <strong>So it&apos;s slow.</strong> About 2.5 positions per second on a T4 GPU, compared with thousands for
              Leela and millions for Stockfish. Its search can only afford to look a little way ahead.
            </li>
            <li>
              <strong>And it learned from very little.</strong> No self-play, no billions of games: about 2 million
              labelled moves.
            </li>
          </ul>
          <p>
            So LayaChess isn&apos;t trying to compete with these engines. It&apos;s a test of a different question: what happens
            when you give a general-purpose decision model a chessboard and a bit of search?
          </p>

          <h2>Training it</h2>
          <p>
            I didn&apos;t have to label any positions myself. Google DeepMind released{" "}
            <a href="https://github.com/google-deepmind/searchless_chess" target="_blank" rel="noreferrer noopener">
              ChessBench
            </a>{" "}
            with their &ldquo;searchless chess&rdquo; research: positions from real games where every legal move comes
            with Stockfish&apos;s win probability. The full set has about 15 billion of them.
          </p>
          <p>
            For this first version I trained on a sample of <strong>about 2 million moves</strong> (2.05M to be exact),
            on Kaggle&apos;s free GPUs: two NVIDIA T4s, two sessions of roughly eleven hours each.
          </p>
          <p>
            The thing that mattered most was keeping the questions short. My first format drew the board as a grid
            and used sixteen answer levels, which came to about 335 tokens per question and around 49,000 training
            examples an hour. Piece lists and ten levels brought it down to about 194 tokens, and training speed
            doubled to roughly 97,000 an hour. Same idea, half the words.
          </p>
          <p>
            It wasn&apos;t all smooth. The two GPUs crashed the model on the first try, memory ran out on the second,
            and at one point I started the second training session before the first had finished uploading. Each
            run now saves a checkpoint every 45 minutes, which I strongly recommend to anyone training on free
            hardware.
          </p>

          <h2>What it learned</h2>
          <p>
            I measured progress on 300 positions from games the model never trained on, with two numbers: how often
            Laya&apos;s favourite move matches Stockfish&apos;s favourite, and how far its win chance is from Stockfish&apos;s
            on average.
          </p>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/blog/laya-chess/learning-curve.png")}
              alt="Two line charts over 0 to 2.05 million training examples. Left: the share of positions where Laya picks Stockfish's best move rises from 6% to 27%. Right: the average win-chance error falls from 28.6 to 8.2 points."
              loading="lazy"
            />
            <figcaption>
              Best-move accuracy went from 6% to 27% (a random legal move gets about 3%), and the win-chance error
              dropped from 28.6 to 8.2 points.
            </figcaption>
          </figure>
          <p>
            Most of the gain happens in the first hundred thousand examples, when the model learns to tell a good
            position from a bad one. Telling a good move from a slightly better one is much harder, and progress
            slows down from there. The best-move number is also noisy: with 300 test positions it moves by two or
            three points just by chance, which I learned the stressful way.
          </p>
          <h3>Is 27% any good?</h3>
          <p>
            On its own the number doesn&apos;t mean much, so here&apos;s the closest reference I know of. In
            DeepMind&apos;s searchless chess paper, measured the same way on the same kind of test positions, a small
            9M-parameter transformer built for chess reached about <strong>63%</strong>. It got there after roughly{" "}
            <strong>5 billion training examples</strong> (5 million steps of 1,024), and their full-size models were
            trained on 128 TPUs each.
          </p>
          <p>
            LayaChess saw about <strong>2 million examples</strong>, roughly 2,500 times fewer, over one weekend with
            about 22 hours of training on free GPUs, and it reached 27%. Picking a random legal move gets about 3%.
            So it&apos;s nowhere near a purpose-built model trained at that scale, and it isn&apos;t meant to be. The point of
            this version was to check that a general-purpose decision model can learn chess at all, and the curve
            says it can and is still climbing.
          </p>
          <p>The more satisfying test was simply looking at the moves, before and after training:</p>
          <ul>
            <li>
              <strong>Opening move as White:</strong> b4 before, d4 after.
            </li>
            <li>
              <strong>Answer to 1.e4:</strong> h6 before. After, its top choices are d6, d5, e6, Nf6 and c6, all real
              openings.
            </li>
            <li>
              <strong>Scholar&apos;s Mate, with Qxf7 checkmate on the board:</strong> before, it preferred the quiet d3.
              After, it plays Qxf7 with a 94% win chance, and the next best move sits at 33%.
            </li>
            <li>
              <strong>A free queen left hanging:</strong> it takes it, also at 94%.
            </li>
          </ul>

          <h2>How strong is it?</h2>
          <p>
            Honestly, not very strong yet. In my early games against Stockfish at its weakest official setting
            (Elo 1320 on Stockfish&apos;s own scale), LayaChess has lost every game so far, although one of them lasted
            88 moves. That setting sounds like a beginner, but it&apos;s a sneakily solid opponent that doesn&apos;t hang
            pieces the way beginners do.
          </p>
          <p>
            My rough estimate is that this version plays somewhere around <strong>1000 to 1200</strong> against human
            players, on a chess.com-style scale. That&apos;s an estimate, not a measured rating. A proper rating from
            rated games is one of the next things on the list.
          </p>
          <p>
            For context, DeepMind trained their searchless models on billions of examples. This one saw 2 million.
            It learned a surprising amount from that, and it clearly has a lot of room left.
          </p>

          <h2>Why you can&apos;t play it online (yet)</h2>
          <p>
            Because Laya judges one move at a time, every position means about 35 passes through a 421M-parameter
            model. That needs a GPU to feel responsive, and keeping a GPU server running around the clock costs
            real money every hour it&apos;s on. For an experiment, that didn&apos;t make sense yet, so I couldn&apos;t deploy
            it publicly.
          </p>
          <p>
            For now it runs locally on my laptop, at about two and a half seconds per position without search.
            Hence the screenshot at the top instead of a play button.
          </p>

          <h2>What&apos;s next</h2>
          <p>
            This is version 1, and I&apos;ll be releasing improvements soon. The main things I&apos;m working on:
          </p>
          <ul>
            <li>Scoring all the moves of a position at once, so search can look much deeper in the same time.</li>
            <li>Training on more of the data. Two million moves is a small slice of what&apos;s available.</li>
            <li>A measured rating from real rated games instead of an estimate.</li>
            <li>An online version you can actually play, once it&apos;s cheap enough to host.</li>
          </ul>

          <h2>What I&apos;d tell myself at the start</h2>
          <p>
            Check whether someone has already built the dataset before planning to build it yourself. Keep model
            inputs short, because half the tokens meant twice the training. Don&apos;t judge a run by one noisy number.
            And don&apos;t underestimate Stockfish at 1320.
          </p>
          <p>
            Most of all: a general-purpose System 1 model really can pick up chess. It just needs a lot more
            practice than one experiment gave it.
          </p>

          <h3>Credits</h3>
          <p>
            Built on{" "}
            <a href="https://github.com/NandhaKishorM/laya" target="_blank" rel="noreferrer noopener">
              Laya
            </a>{" "}
            by Convai Innovations,{" "}
            <a href="https://github.com/google-deepmind/searchless_chess" target="_blank" rel="noreferrer noopener">
              ChessBench
            </a>{" "}
            by Google DeepMind,{" "}
            <a href="https://stockfishchess.org" target="_blank" rel="noreferrer noopener">
              Stockfish
            </a>{" "}
            and{" "}
            <a href="https://python-chess.readthedocs.io" target="_blank" rel="noreferrer noopener">
              python-chess
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
