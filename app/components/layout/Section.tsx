import { cn } from "~/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Section({
  className,
  children,
  eyebrow,
  title,
  description,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl space-y-3">
            {eyebrow && (
              <p className="text-sm font-medium text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base leading-7 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
