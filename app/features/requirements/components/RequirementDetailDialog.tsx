import { Copy, Download, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

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

function downloadAsset(url: string, fileName?: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName ?? "";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function downloadAssets(
  assets: NonNullable<KompreRequirement["downloadableAssets"]>
) {
  assets.forEach((asset, index) => {
    window.setTimeout(() => downloadAsset(asset.url, asset.fileName), index * 150);
  });
}

export function RequirementDetailDialog({
  requirement,
  children,
}: {
  requirement: KompreRequirement;
  children: React.ReactNode;
}) {
  const externalLinks = requirement.externalLinks ?? [];
  const downloadableAssets = requirement.downloadableAssets ?? [];

  async function copyPrompt() {
    if (!requirement.copyablePrompt) {
      return;
    }

    await navigator.clipboard.writeText(requirement.copyablePrompt.text);
    toast.success("Prompt berhasil disalin.");
  }

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

          {downloadableAssets.length ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">File pendukung</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Download seluruh halaman dokumen yang sudah tersedia.
                  </p>
                </div>
                <Button
                  className="glass-button w-full sm:w-auto"
                  onClick={() => downloadAssets(downloadableAssets)}
                  type="button"
                  variant="outline"
                >
                  <Download className="size-4" />
                  Download Semua
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {downloadableAssets.map((asset) => (
                  <Button
                    className="justify-start"
                    key={`${asset.label}-${asset.url}`}
                    onClick={() => downloadAsset(asset.url, asset.fileName)}
                    type="button"
                    variant="outline"
                  >
                    <Download className="size-4" />
                    <span className="truncate">{asset.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : null}

          {requirement.copyablePrompt ? (
            <div className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">Prompt bantuan</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Copy prompt ini, lalu ganti bagian placeholder sesuai data
                    kamu.
                  </p>
                </div>
                <Button
                  className="glass-button w-full sm:w-auto"
                  onClick={copyPrompt}
                  type="button"
                  variant="outline"
                >
                  <Copy className="size-4" />
                  {requirement.copyablePrompt.label}
                </Button>
              </div>
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-background p-4 text-xs leading-5 text-muted-foreground">
                {requirement.copyablePrompt.text}
              </pre>
            </div>
          ) : null}

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

        <DialogFooter className="min-w-0 items-stretch sm:items-center sm:flex-wrap">
          {externalLinks.map((link) => (
            <Button
              asChild
              className="h-auto min-h-9 w-full min-w-0 justify-between whitespace-normal px-3 py-2 text-left sm:w-auto sm:max-w-full"
              key={`${link.label}-${link.url}`}
              title={link.description ?? link.label}
              variant="outline"
            >
              <a
                className="min-w-0"
                href={link.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="min-w-0 break-words leading-5">
                  {link.label}
                </span>
                <ExternalLink className="size-4 shrink-0" />
              </a>
            </Button>
          ))}
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
