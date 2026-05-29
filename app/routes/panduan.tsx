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
    { title: "Panduan Dokumen | Panduan Pengajuan Kompre" },
    {
      name: "description",
      content: "Daftar dokumen dan panduan persiapan pengajuan kompre.",
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
    <main>
      <Section
        description="Cari dokumen, lihat status, baca catatan penting, dan buka generator untuk dokumen yang bisa dibuat mandiri."
        title="Panduan Dokumen Pengajuan Kompre"
      >
        <div className="space-y-5">
          <RequirementSearch onChange={setQuery} value={query} />
          <RequirementCategoryTabs onChange={setCategory} value={category} />
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredRequirements.length} dari{" "}
            {kompreRequirements.length} dokumen.
          </p>
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
