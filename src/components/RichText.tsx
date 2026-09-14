import { Fragment, type ReactNode } from "react";

/**
 * Renders *emphasis* markers from the plain-string copy in src/data as real
 * <em> elements. Keeping the content as plain strings means it stays editable
 * without touching JSX; this is the one bit of formatting that earns a parser.
 */
export function RichText({ children }: { children: string }): ReactNode {
  const parts = children.split(/\*([^*]+)\*/g);

  return parts.map((part, index) =>
    // Odd indices are the captured groups — i.e. the emphasised runs.
    index % 2 === 1 ? (
      <em key={index} className="italic text-fg/90">
        {part}
      </em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
