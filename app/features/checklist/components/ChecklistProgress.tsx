import { Progress } from "~/components/ui/progress";

export function ChecklistProgress({
  checkedCount,
  totalCount,
}: {
  checkedCount: number;
  totalCount: number;
}) {
  const progress =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm font-medium">Progress kelengkapan dokumen</p>
          <p className="text-sm text-muted-foreground">
            {checkedCount} dari {totalCount} dokumen sudah ditandai tersedia.
          </p>
        </div>
        <p className="text-2xl font-semibold">{progress}%</p>
      </div>
      <Progress aria-label="Progress checklist dokumen" value={progress} />
    </div>
  );
}
