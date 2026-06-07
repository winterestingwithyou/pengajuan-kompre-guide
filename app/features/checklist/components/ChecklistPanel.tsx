import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { kompreRequirements } from "~/features/requirements/data/kompre-requirements";
import { useChecklist } from "~/features/checklist/hooks/use-checklist";
import { ChecklistItem } from "~/features/checklist/components/ChecklistItem";
import { ChecklistProgress } from "~/features/checklist/components/ChecklistProgress";

type ChecklistFilter = "all" | "checked" | "unchecked";

export function ChecklistPanel() {
  const [filter, setFilter] = useState<ChecklistFilter>("all");
  const {
    items,
    getItem,
    setChecked,
    setFileUrl,
    setNote,
    resetChecklist,
  } = useChecklist();
  const checkedCount = items.filter((item) => item.checked).length;
  const uncheckedCount = kompreRequirements.length - checkedCount;
  const filteredRequirements = kompreRequirements.filter((requirement) => {
    const checked = getItem(requirement.id)?.checked ?? false;

    if (filter === "checked") {
      return checked;
    }

    if (filter === "unchecked") {
      return !checked;
    }

    return true;
  });

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
          <Tabs
            onValueChange={(value) => setFilter(value as ChecklistFilter)}
            value={filter}
          >
            <TabsList className="grid h-auto w-full grid-cols-3 sm:w-fit">
              <TabsTrigger className="min-w-0 px-2" value="all">
                Semua
                <span className="text-xs text-muted-foreground">
                  {kompreRequirements.length}
                </span>
              </TabsTrigger>
              <TabsTrigger className="min-w-0 px-2" value="checked">
                Sudah ada
                <span className="text-xs text-muted-foreground">
                  {checkedCount}
                </span>
              </TabsTrigger>
              <TabsTrigger className="min-w-0 px-2" value="unchecked">
                Belum ada
                <span className="text-xs text-muted-foreground">
                  {uncheckedCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredRequirements.map((requirement) => (
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
