import { Badge } from "~/components/ui/badge";
import type { KompreRequirement } from "~/features/requirements/data/kompre-requirements";

export function RequirementBadges({
  requirement,
}: {
  requirement: KompreRequirement;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {requirement.isRequired && <Badge>Wajib</Badge>}
      {requirement.canGenerate && (
        <Badge variant="secondary">Bisa Generate</Badge>
      )}
      {requirement.acceptedFileType === "pdf" && (
        <Badge variant="outline">PDF</Badge>
      )}
      {requirement.acceptedFileType === "image" && (
        <Badge variant="outline">Image</Badge>
      )}
      {requirement.guideStatus === "todo" && (
        <Badge variant="outline">Panduan Belum Lengkap</Badge>
      )}
      {requirement.guideStatus === "ready" && (
        <Badge variant="secondary">Panduan Tersedia</Badge>
      )}
    </div>
  );
}
