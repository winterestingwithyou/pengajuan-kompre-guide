import { ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { LinkifiedText } from "~/components/LinkifiedText";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import {
  requirementCategoryLabels,
  type KompreRequirement,
} from "~/features/requirements/data/kompre-requirements";
import { RequirementBadges } from "~/features/requirements/components/RequirementBadges";

export function RequirementDetailDialog({
  requirement,
  children,
}: {
  requirement: KompreRequirement;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[min(88vh,720px)] overflow-y-auto scrollbar-hide rounded-lg border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 sm:max-w-2xl">
        <DialogHeader className="pr-10">
          <DialogTitle className="leading-snug">
            {requirement.title}
          </DialogTitle>
          <DialogDescription className="leading-6">
            {requirement.description}
          </DialogDescription>
        </DialogHeader>

        <div className="min-w-0 space-y-5">
          <RequirementBadges requirement={requirement} />

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="min-w-0">
              <p className="font-medium">Kategori</p>
              <p className="break-words text-muted-foreground">
                {requirementCategoryLabels[requirement.category]}
              </p>
            </div>
            {requirement.sourceLabel && (
              <div className="min-w-0">
                <p className="font-medium">Sumber dokumen</p>
                <p className="break-words text-muted-foreground">
                  {requirement.sourceLabel}
                </p>
              </div>
            )}
            {requirement.maxFileSizeMb && (
              <div className="min-w-0">
                <p className="font-medium">Maksimal ukuran</p>
                <p className="break-words text-muted-foreground">
                  {requirement.maxFileSizeMb} MB
                </p>
              </div>
            )}
            {requirement.maxFileCount && (
              <div className="min-w-0">
                <p className="font-medium">Jumlah file</p>
                <p className="break-words text-muted-foreground">
                  Maksimal {requirement.maxFileCount} file
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-medium">Cara mendapatkan dokumen</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {requirement.howToGet.map((step) => (
                <li className="min-w-0 break-words" key={step}>
                  <LinkifiedText text={step} />
                </li>
              ))}
            </ol>
          </div>

          {requirement.notes?.length ? (
            <div className="space-y-3">
              <h3 className="font-medium">Catatan penting</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                {requirement.notes.map((note) => (
                  <li className="min-w-0 break-words" key={note}>
                    <LinkifiedText text={note} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          {requirement.externalLink && (
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <a
                className="min-w-0"
                href={requirement.externalLink}
                rel="noreferrer"
                target="_blank"
              >
                <span className="truncate">
                  {requirement.externalLinkLabel ?? "Buka Link Terkait"}
                </span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
          {requirement.canGenerate && requirement.templateId && (
            <Button asChild className="w-full sm:w-auto">
              <Link to={`/generator/${requirement.templateId}`}>
                <FileText className="size-4" />
                Generate Surat
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
