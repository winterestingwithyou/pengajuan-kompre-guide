import { FileText } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import type { ChecklistItem as StoredChecklistItem } from "~/lib/db";
import {
  requirementCategoryLabels,
  type KompreRequirement,
} from "~/features/requirements/data/kompre-requirements";
import { getRequirementGeneratableLetters } from "~/features/letters/data/letter-templates";
import { ChecklistFileLinkInput } from "~/features/checklist/components/ChecklistFileLinkInput";

export function ChecklistItem({
  requirement,
  item,
  onCheckedChange,
  onFileUrlChange,
  onNoteChange,
}: {
  requirement: KompreRequirement;
  item?: StoredChecklistItem;
  onCheckedChange: (checked: boolean) => void;
  onFileUrlChange: (fileUrl: string) => void;
  onNoteChange: (note: string) => void;
}) {
  const checked = item?.checked ?? false;
  const fileUrl = item?.fileUrl ?? "";
  const note = item?.note ?? "";
  const generatableLetters = getRequirementGeneratableLetters(requirement);

  return (
    <Card
      className="soft-panel rounded-lg transition-shadow hover:shadow-[0_18px_60px_-48px_oklch(0_0_0)]"
      size="sm"
    >
      <CardHeader className="grid-cols-[auto_minmax(0,1fr)] gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Checkbox
          aria-label={`Tandai ${requirement.title} sudah ada`}
          checked={checked}
          className="mt-1 size-5"
          onCheckedChange={(nextChecked) =>
            onCheckedChange(nextChecked === true)
          }
        />
        <div className="min-w-0 space-y-2">
          <CardTitle className="break-words">{requirement.title}</CardTitle>
          <p className="break-words text-sm leading-6 text-muted-foreground">
            {requirement.description}
          </p>
          <div className="flex min-w-0 flex-wrap gap-2">
            <Badge variant={checked ? "secondary" : "outline"}>
              {checked ? "Sudah ada" : "Belum ada"}
            </Badge>
            {generatableLetters.length > 0 && (
              <Badge variant="secondary">Bisa digenerate</Badge>
            )}
            <Badge className="max-w-full truncate" variant="outline">
              {requirementCategoryLabels[requirement.category]}
            </Badge>
          </div>
        </div>
        {generatableLetters.length > 0 && (
          <div className="col-span-2 flex min-w-0 flex-col gap-2 sm:col-span-1">
            {generatableLetters.map((letter) => (
              <Button
                asChild
                className="h-auto min-h-9 w-full min-w-0 max-w-full shrink whitespace-normal px-3 py-2 sm:w-auto"
                key={letter.templateId}
                title={letter.description ?? letter.label}
              >
                <Link className="max-w-full" to={`/generator/${letter.templateId}`}>
                  <FileText className="size-4 shrink-0" />
                  <span className="min-w-0 break-words leading-5">
                    {letter.label}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        <ChecklistFileLinkInput
          id={requirement.id}
          onChange={onFileUrlChange}
          value={fileUrl}
        />
        <Field>
          <FieldLabel htmlFor={`${requirement.id}-note`}>
            Catatan lokal
          </FieldLabel>
          <Textarea
            id={`${requirement.id}-note`}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Tambahkan catatan pribadi jika diperlukan"
            value={note}
          />
          <FieldDescription>
            Catatan ini juga hanya tersimpan di browser perangkat ini.
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}
