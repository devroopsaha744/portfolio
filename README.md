# devroopsaha744.github.io/portfolio

My personal site. Built with Next.js, exported as static HTML, deployed to GitHub Pages.

**Live:** https://devroopsaha744.github.io/portfolio

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), static export |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Hosting | GitHub Pages via GitHub Actions |

## Local development

```bash
npm install
npm run dev     # http://localhost:3000/portfolio
```

Node 20.9+ is required (Next 15 won't start on older).

To check what actually ships, build the export and serve it under the `/portfolio`
base path. Serving `out/` at the web root will 404 on every asset:

```bash
npm run build
mkdir -p /tmp/site && cp -r out /tmp/site/portfolio && npx serve /tmp/site -p 4173
```

## Editing content

All copy lives in `src/data/` as plain TypeScript, no JSX to touch:

| File | What it holds |
|---|---|
| `profile.ts` | Name, headline, tagline, social links, email |
| `about.ts` | About copy and the stat strip (`*asterisks*` render as italics) |
| `experience.ts` | Roles, bullets, education |
| `projects.ts` | The six featured projects, their blurbs and links |
| `skills.ts` | Skill groups |
| `achievements.ts` | Awards and placements |

## Résumé

The source of truth is `resume/main.tex`. Rebuild the PDF after editing it:

```bash
brew install tectonic      # one-time
tectonic -o public resume/main.tex && mv public/main.pdf public/Devroop_Saha_Resume.pdf
```

Two things to know:

- **The committed source has no phone number.** This repo is public and git
  history is permanent. The private master (`~/main.tex`) keeps the phone for job
  applications; the two are otherwise identical. Don't paste the phone back in here.
- **Keep it to one page.** Check with `tectonic` output, or open the PDF. If it
  spills, tighten bullet wording before deleting whole bullets.

## Data pulled in at build time

- **Medium posts**: read from the public RSS feed at `medium.com/feed/@datafreakai`.
  If the feed is unreachable the build falls back to the snapshot in
  `src/data/medium-fallback.json` rather than failing.
- **GitHub stars**: refreshed from the GitHub API, falling back to the counts
  baked into `projects.ts`.

Both are frozen into the export, so the nightly workflow run is what keeps them
fresh on a static host.

## Turning on the contact form

The form posts to [Web3Forms](https://web3forms.com/#start). Until a key is set it
degrades to a plain mailto link.

1. Enter your email at https://web3forms.com/#start. They send you an access key.
2. Add it as a repository secret named `NEXT_PUBLIC_WEB3FORMS_KEY`
   (Settings → Secrets and variables → Actions).
3. Re-run the deploy workflow.

The key is public by design: this is a static site, the POST happens in the
browser, and the key only permits submissions to the address it was issued for.

## Deployment

Every push to `main` builds and deploys. **One-time setup:** Settings → Pages →
Source → **GitHub Actions**. Without that, the first run fails at the deploy step.
