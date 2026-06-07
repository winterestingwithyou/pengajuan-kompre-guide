import { FileText } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  requirementCategoryLabels,
  type KompreRequirement,
} from "~/features/requirements/data/kompre-requirements";
import { RequirementBadges } from "~/features/requirements/components/RequirementBadges";
import { RequirementDetailDialog } from "~/features/requirements/components/RequirementDetailDialog";

export function RequirementCard({
  requirement,
}: {
  requirement: KompreRequirement;
}) {
  return (
    <Card
      className="soft-panel rounded-lg transition-transform hover:-translate-y-0.5"
      size="sm"
    >
      <CardHeader className="gap-3">
        <CardTitle className="pr-2 leading-snug">
          {requirement.title}
        </CardTitle>
        <CardAction>
          <span className="block max-w-32 truncate rounded-md bg-neutral-100 px-2 py-1 text-xs text-muted-foreground ring-1 ring-border dark:bg-neutral-800 sm:max-w-none">
            {requirementCategoryLabels[requirement.category]}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="break-words leading-6 text-muted-foreground">
          {requirement.description}
        </p>
        <RequirementBadges requirement={requirement} />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <RequirementDetailDialog requirement={requirement}>
          <Button className="glass-button w-full sm:w-auto" variant="outline">
            Lihat Detail
          </Button>
        </RequirementDetailDialog>
        {requirement.canGenerate && requirement.templateId && (
          <Button asChild className="w-full sm:w-auto">
            <Link to={`/generator/${requirement.templateId}`}>
              <FileText className="size-4" />
              Generate Surat
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
