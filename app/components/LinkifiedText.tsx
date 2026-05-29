const urlPattern = /(https?:\/\/[^\s),]+[^\s).,])/g;

export function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(urlPattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part.match(urlPattern)) {
          return part;
        }

        return (
          <a
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            href={part}
            key={`${part}-${index}`}
            rel="noreferrer"
            target="_blank"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
