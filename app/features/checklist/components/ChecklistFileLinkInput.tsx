import { ExternalLink } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";

function isLikelyUrl(value: string) {
  return (
    value.length === 0 ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
}

export function ChecklistFileLinkInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const invalid = !isLikelyUrl(value);

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={`${id}-file-url`}>Link lokasi file</FieldLabel>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          aria-invalid={invalid}
          id={`${id}-file-url`}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Tempel link Google Drive / OneDrive / lokasi file lainnya"
          value={value}
        />
        {value && !invalid && (
          <Button asChild className="glass-button sm:w-auto" variant="outline">
            <a href={value} rel="noreferrer" target="_blank">
              Buka File
              <ExternalLink className="size-4" />
            </a>
          </Button>
        )}
      </div>
      <FieldDescription>
        Aplikasi hanya menyimpan URL secara lokal di browser, bukan file dokumen.
      </FieldDescription>
      {invalid && (
        <FieldError>
          Jika diisi, link sebaiknya diawali dengan http:// atau https://.
        </FieldError>
      )}
    </Field>
  );
}
