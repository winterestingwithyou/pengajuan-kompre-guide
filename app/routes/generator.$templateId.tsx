import { Link } from "react-router";

import type { Route } from "./+types/generator.$templateId";
import { Section } from "~/components/layout/Section";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LetterGeneratorForm } from "~/features/letters/components/LetterGeneratorForm";
import {
  getLetterTemplate,
  letterTemplates,
} from "~/features/letters/data/letter-templates";
import { LetterTemplateCard } from "~/features/letters/components/LetterTemplateCard";

export function meta({ params }: Route.MetaArgs) {
  const template = getLetterTemplate(params.templateId);

  return [
    {
      title: template
        ? `${template.title} | Panduan Pengajuan Kompre`
        : "Generator Surat | Panduan Pengajuan Kompre",
    },
  ];
}

export default function Generator({ params }: Route.ComponentProps) {
  const template = getLetterTemplate(params.templateId);

  if (!template) {
    return (
      <main className="page-gradient">
        <Section
          description="Template yang diminta belum tersedia. Pilih salah satu generator surat awal berikut."
          eyebrow="Generator"
          title="Template Tidak Ditemukan"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {letterTemplates.map((item) => (
              <LetterTemplateCard key={item.id} template={item} />
            ))}
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="page-gradient">
      <Section
        description={template.description}
        eyebrow="Generator"
        title={template.title}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="soft-panel rounded-lg">
            <CardHeader>
              <CardTitle>Isi Data Surat</CardTitle>
              <CardDescription>
                Dokumen akan dibuat langsung di browser dan diunduh sebagai
                DOCX.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LetterGeneratorForm template={template} />
            </CardContent>
          </Card>

          <aside className="space-y-4">
            <Card className="soft-panel rounded-lg" size="sm">
              <CardHeader>
                <CardTitle>Catatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                <p>
                  Generator ini belum menggantikan format resmi apabila program
                  studi memiliki template final.
                </p>
                <p>
                  Setelah mengunduh, periksa kembali isi surat sebelum dipakai.
                </p>
                <Button asChild className="glass-button" variant="outline">
                  <Link to="/panduan">Kembali ke Panduan</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </main>
  );
}
