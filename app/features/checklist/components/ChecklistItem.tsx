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
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import type { ChecklistItem as StoredChecklistItem } from "~/lib/db";
import {
  requirementCategoryLabels,
  type KompreRequirement,
} from "~/features/requirements/data/kompre-requirements";
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

  return (
    <Card className="rounded-lg" size="sm">
      <CardHeader className="gap-4 sm:grid-cols-[auto_1fr_auto]">
        <Checkbox
          aria-label={`Tandai ${requirement.title} sudah ada`}
          checked={checked}
          className="mt-1 size-5"
          onCheckedChange={(nextChecked) =>
            onCheckedChange(nextChecked === true)
          }
        />
        <div className="min-w-0 space-y-2">
          <CardTitle>{requirement.title}</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            {requirement.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant={checked ? "secondary" : "outline"}>
              {checked ? "Sudah ada" : "Belum ada"}
            </Badge>
            {requirement.canGenerate && (
              <Badge variant="secondary">Bisa digenerate</Badge>
            )}
            <Badge variant="outline">
              {requirementCategoryLabels[requirement.category]}
            </Badge>
          </div>
        </div>
        {requirement.canGenerate && requirement.templateId && (
          <Button asChild className="w-full sm:w-auto">
            <Link to={`/generator/${requirement.templateId}`}>
              <FileText className="size-4" />
              Generate Surat
            </Link>
          </Button>
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
