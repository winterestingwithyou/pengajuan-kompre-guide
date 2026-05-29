import { RotateCcw } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { kompreRequirements } from "~/features/requirements/data/kompre-requirements";
import { useChecklist } from "~/features/checklist/hooks/use-checklist";
import { ChecklistItem } from "~/features/checklist/components/ChecklistItem";
import { ChecklistProgress } from "~/features/checklist/components/ChecklistProgress";

export function ChecklistPanel() {
  const {
    items,
    getItem,
    setChecked,
    setFileUrl,
    setNote,
    resetChecklist,
  } = useChecklist();
  const checkedCount = items.filter((item) => item.checked).length;

  return (
    <div className="space-y-6">
      <Card className="soft-panel rounded-lg">
        <CardContent className="space-y-5">
          <ChecklistProgress
            checkedCount={checkedCount}
            totalCount={kompreRequirements.length}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Checklist dan link file disimpan di IndexedDB browser perangkat
              ini.
            </p>
            <Button
              className="glass-button"
              onClick={resetChecklist}
              type="button"
              variant="outline"
            >
              <RotateCcw className="size-4" />
              Reset Checklist
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {kompreRequirements.map((requirement) => (
          <ChecklistItem
            item={getItem(requirement.id)}
            key={requirement.id}
            onCheckedChange={(checked) => setChecked(requirement.id, checked)}
            onFileUrlChange={(fileUrl) =>
              setFileUrl(requirement.id, fileUrl)
            }
            onNoteChange={(note) => setNote(requirement.id, note)}
            requirement={requirement}
          />
        ))}
      </div>
    </div>
  );
}
