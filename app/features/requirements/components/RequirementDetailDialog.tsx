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
        <DialogHeader>
          <DialogTitle>{requirement.title}</DialogTitle>
          <DialogDescription>{requirement.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <RequirementBadges requirement={requirement} />

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium">Kategori</p>
              <p className="text-muted-foreground">
                {requirementCategoryLabels[requirement.category]}
              </p>
            </div>
            {requirement.sourceLabel && (
              <div>
                <p className="font-medium">Sumber dokumen</p>
                <p className="text-muted-foreground">
                  {requirement.sourceLabel}
                </p>
              </div>
            )}
            {requirement.maxFileSizeMb && (
              <div>
                <p className="font-medium">Maksimal ukuran</p>
                <p className="text-muted-foreground">
                  {requirement.maxFileSizeMb} MB
                </p>
              </div>
            )}
            {requirement.maxFileCount && (
              <div>
                <p className="font-medium">Jumlah file</p>
                <p className="text-muted-foreground">
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
                <li key={step}>
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
                  <li key={note}>
                    <LinkifiedText text={note} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          {requirement.externalLink && (
            <Button asChild variant="outline">
              <a
                href={requirement.externalLink}
                rel="noreferrer"
                target="_blank"
              >
                {requirement.externalLinkLabel ?? "Buka Link Terkait"}
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
          {requirement.canGenerate && requirement.templateId && (
            <Button asChild>
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
