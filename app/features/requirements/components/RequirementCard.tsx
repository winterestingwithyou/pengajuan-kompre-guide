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
import { getRequirementGeneratableLetters } from "~/features/letters/data/letter-templates";
import { RequirementBadges } from "~/features/requirements/components/RequirementBadges";
import { RequirementDetailDialog } from "~/features/requirements/components/RequirementDetailDialog";

export function RequirementCard({
  requirement,
}: {
  requirement: KompreRequirement;
}) {
  const generatableLetters = getRequirementGeneratableLetters(requirement);

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
      <CardFooter className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <RequirementDetailDialog requirement={requirement}>
          <Button
            className="glass-button w-full min-w-0 shrink sm:w-auto"
            variant="outline"
          >
            Lihat Detail
          </Button>
        </RequirementDetailDialog>
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
      </CardFooter>
    </Card>
  );
}
