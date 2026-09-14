import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, deployed on
          GitHub Pages.
        </p>
        <p className="font-mono text-xs text-faint">
          Written between matches. <span className="text-garnet-lit">Visca el Barça.</span>
        </p>
      </div>
    </footer>
  );
}
