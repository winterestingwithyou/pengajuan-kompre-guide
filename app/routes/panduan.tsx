import { useMemo, useState } from "react";

import type { Route } from "./+types/panduan";
import { Section } from "~/components/layout/Section";
import {
  type CategoryFilter,
  RequirementCategoryTabs,
} from "~/features/requirements/components/RequirementCategoryTabs";
import { RequirementCard } from "~/features/requirements/components/RequirementCard";
import { RequirementSearch } from "~/features/requirements/components/RequirementSearch";
import {
  kompreRequirements,
  requirementCategoryLabels,
} from "~/features/requirements/data/kompre-requirements";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panduan Dokumen | Kompre D3 Manajemen Informatika Unsri" },
    {
      name: "description",
      content:
        "Daftar dokumen dan panduan persiapan pengajuan kompre mahasiswa D3 Manajemen Informatika Universitas Sriwijaya.",
    },
  ];
}

export default function Panduan() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("semua");

  const filteredRequirements = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return kompreRequirements.filter((requirement) => {
      const matchesCategory =
        category === "semua" || requirement.category === category;
      const haystack = [
        requirement.title,
        requirement.description,
        requirement.sourceLabel ?? "",
        requirementCategoryLabels[requirement.category],
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedQuery);
    });
  }, [category, query]);

  return (
    <main className="page-gradient">
      <Section
        description="Cari dokumen, lihat status, baca catatan penting, dan buka generator untuk dokumen yang bisa dibuat mandiri oleh mahasiswa D3 Manajemen Informatika Universitas Sriwijaya."
        eyebrow="Panduan"
        title="Panduan Dokumen Kompre D3 Manajemen Informatika Unsri"
      >
        <div className="space-y-6">
          <div className="soft-panel rounded-lg p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <RequirementSearch onChange={setQuery} value={query} />
              <p className="text-sm text-muted-foreground">
                {filteredRequirements.length} / {kompreRequirements.length}{" "}
                dokumen
              </p>
            </div>
            <div className="mt-4">
              <RequirementCategoryTabs onChange={setCategory} value={category} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredRequirements.map((requirement) => (
              <RequirementCard
                key={requirement.id}
                requirement={requirement}
              />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
