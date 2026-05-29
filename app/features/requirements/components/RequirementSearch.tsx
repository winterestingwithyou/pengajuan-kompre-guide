import { Search } from "lucide-react";

import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export function RequirementSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field className="relative">
      <FieldLabel className="sr-only" htmlFor="requirement-search">
        Cari dokumen
      </FieldLabel>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4! -translate-y-1/2 text-muted-foreground" />
      <Input
        className="h-11 border-neutral-300 bg-white/80 pl-9 shadow-none dark:border-neutral-700 dark:bg-neutral-900/70"
        id="requirement-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari dokumen, kategori, atau sumber"
        type="search"
        value={value}
      />
    </Field>
  );
}
