import { Badge } from "~/components/ui/badge";
import type { KompreRequirement } from "~/features/requirements/data/kompre-requirements";

export function RequirementBadges({
  requirement,
}: {
  requirement: KompreRequirement;
}) {
  return (
    <div className="flex min-w-0 flex-wrap gap-2">
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
        <Badge className="max-w-full truncate" variant="outline">
          Panduan Belum Tersedia
        </Badge>
      )}
      {requirement.guideStatus === "draft" && (
        <Badge className="max-w-full truncate" variant="outline">
          Panduan Draft
        </Badge>
      )}
      {requirement.guideStatus === "ready" && (
        <Badge className="max-w-full truncate" variant="secondary">
          Panduan Tersedia
        </Badge>
      )}
    </div>
  );
}
