import { ExternalLink } from "lucide-react";

import type { Route } from "./+types/checklist";
import { Section } from "~/components/layout/Section";
import { Button } from "~/components/ui/button";
import { GOOGLE_FORM_URL } from "~/lib/constants";
import { ChecklistPanel } from "~/features/checklist/components/ChecklistPanel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Checklist Dokumen | Kompre D3 Manajemen Informatika Unsri" },
    {
      name: "description",
      content:
        "Checklist dokumen dan link lokasi file pengajuan kompre mahasiswa D3 Manajemen Informatika Universitas Sriwijaya.",
    },
  ];
}

export default function Checklist() {
  return (
    <main className="page-gradient">
      <Section
        description="Tandai dokumen yang sudah tersedia, simpan link lokasi file, dan pantau progress kelengkapan sebelum mahasiswa D3 Manajemen Informatika Unsri melanjutkan ke form resmi."
        eyebrow="Checklist"
        title="Checklist Dokumen Kompre D3 MI Unsri"
      >
        <div className="mb-2">
          <Button asChild className="glass-button" variant="outline">
            <a href={GOOGLE_FORM_URL} rel="noreferrer" target="_blank">
              Buka Google Form Resmi
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
        <ChecklistPanel />
      </Section>
    </main>
  );
}
