import type { BlogBodyBlock } from "@/app/blog/content";

export type BlogBodyProps = {
  blocks: BlogBodyBlock[];
};

export function BlogBody({ blocks }: BlogBodyProps) {
  return (
    <div className="space-y-5 text-[var(--text-primary)]">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={i}
              className="text-base leading-[1.75] text-[var(--text-secondary)]"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="pt-2 text-xl font-bold tracking-[-0.02em] text-[var(--text-heading)] md:text-2xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "bulletList") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 text-base leading-[1.7] text-[var(--text-secondary)] marker:text-[var(--primary-color)]"
            >
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}
