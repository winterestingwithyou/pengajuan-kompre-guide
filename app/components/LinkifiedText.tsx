import type { ReactNode } from "react";

const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s),]+[^\s).,])/g;

function LinkAnchor({ label, url }: { label: string; url: string }) {
  return (
    <a
      className="break-words font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
      href={url}
      rel="noreferrer"
      target="_blank"
      title={url}
    >
      {label}
    </a>
  );
}

export function LinkifiedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  linkPattern.lastIndex = 0;

  while ((match = linkPattern.exec(text))) {
    const [fullMatch, markdownLabel, markdownUrl, rawUrl] = match;
    const url = markdownUrl ?? rawUrl;
    const label = markdownLabel ?? url;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <LinkAnchor
        key={`${url}-${match.index}`}
        label={label}
        url={url}
      />
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
