import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  FolderCheck,
  HelpCircle,
  ListChecks,
} from "lucide-react";
import { Link } from "react-router";

import type { Route } from "./+types/_index";
import { Section } from "~/components/layout/Section";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GOOGLE_FORM_URL } from "~/lib/constants";
import { kompreRequirements } from "~/features/requirements/data/kompre-requirements";
import { letterTemplates } from "~/features/letters/data/letter-templates";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panduan Pengajuan Kompre" },
    {
      name: "description",
      content:
        "Panduan, checklist, dan generator surat untuk persiapan pengajuan kompre.",
    },
  ];
}

const flows = [
  "Pahami alur dan daftar dokumen yang diminta.",
  "Siapkan dokumen dari akademik, perpustakaan, laboratorium, dan unit terkait.",
  "Tandai kesiapan dokumen dan simpan link file di checklist lokal.",
  "Generate surat yang bisa dibuat mandiri jika diperlukan.",
  "Lanjutkan pengisian ke Google Form resmi.",
];

const faqs = [
  {
    question: "Apakah aplikasi ini menggantikan Google Form?",
    answer:
      "Tidak. Aplikasi ini hanya membantu persiapan sebelum mahasiswa mengisi Google Form resmi.",
  },
  {
    question: "Apakah file dokumen diupload ke aplikasi?",
    answer:
      "Tidak. Aplikasi hanya menyimpan link lokasi file secara lokal di browser pengguna.",
  },
  {
    question: "Apakah checklist tersimpan setelah reload?",
    answer:
      "Ya. Status checklist, link file, dan catatan lokal disimpan memakai IndexedDB di perangkat yang sama.",
  },
];

export default function Index() {
  const generatedCount = kompreRequirements.filter(
    (requirement) => requirement.canGenerate
  ).length;

  return (
    <main>
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <Badge variant="outline">Persiapan sebelum Google Form</Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                Panduan Pengajuan Kompre
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Siapkan seluruh dokumen pengajuan kompre dengan lebih terarah.
                Gunakan checklist untuk menandai dokumen yang sudah tersedia,
                simpan link file dokumen, dan generate surat yang dapat dibuat
                mandiri sebelum melanjutkan ke Google Form resmi.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/checklist">
                  Mulai Checklist
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/panduan">Lihat Panduan</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={GOOGLE_FORM_URL} rel="noreferrer" target="_blank">
                  Buka Google Form
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-5 shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Ringkasan Persiapan</p>
                  <p className="text-sm text-muted-foreground">
                    Dokumen, checklist, dan generator surat.
                  </p>
                </div>
                <ClipboardList className="size-5 text-muted-foreground" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-md border p-4">
                  <p className="text-2xl font-semibold">
                    {kompreRequirements.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dokumen dalam panduan
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p className="text-2xl font-semibold">{generatedCount}</p>
                  <p className="text-sm text-muted-foreground">
                    Surat bisa digenerate
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <p className="text-2xl font-semibold">
                    {letterTemplates.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Template generator awal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Alur Pengajuan Kompre"
        description="Ikuti alur ini sebagai panduan ringan sebelum masuk ke form resmi."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {flows.map((flow, index) => (
            <Card className="rounded-lg" key={flow} size="sm">
              <CardHeader>
                <div className="grid size-9 place-items-center rounded-md bg-muted text-sm font-semibold">
                  {index + 1}
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">{flow}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="border-y bg-muted/30"
        title="Ringkasan Dokumen yang Perlu Disiapkan"
        description="Dokumen dikelompokkan dari identitas, akademik, tugas akhir, hingga data akademik."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: FolderCheck,
              title: "Daftar dokumen lengkap",
              description:
                "Lihat seluruh dokumen berdasarkan field upload pada Google Form.",
            },
            {
              icon: ListChecks,
              title: "Checklist dokumen",
              description:
                "Tandai dokumen yang sudah tersedia dan pantau progress kelengkapan.",
            },
            {
              icon: FileText,
              title: "Generator surat",
              description:
                "Buat dokumen awal untuk surat yang bisa disiapkan mandiri.",
            },
          ].map((item) => (
            <Card className="rounded-lg" key={item.title}>
              <CardHeader>
                <item.icon className="size-5 text-muted-foreground" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Fitur Checklist Dokumen">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-lg">
            <CardHeader>
              <CheckCircle2 className="size-5 text-muted-foreground" />
              <CardTitle>Status dan progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">
                Centang dokumen yang sudah ada, lihat badge status, dan pantau
                progress kelengkapan dari total dokumen.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <ClipboardList className="size-5 text-muted-foreground" />
              <CardTitle>Link lokasi file</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">
                Simpan link Google Drive, OneDrive, atau lokasi file lain secara
                lokal tanpa upload file ke aplikasi.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        className="border-y bg-muted/30"
        title="Fitur Generator Surat"
        description="Generator awal berjalan di browser dan menghasilkan file DOCX untuk diperiksa ulang."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {letterTemplates.map((template) => (
            <Card className="rounded-lg" key={template.id} size="sm">
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-6 text-muted-foreground">
                  {template.description}
                </p>
                <Button asChild variant="outline">
                  <Link to={`/generator/${template.id}`}>Buka Generator</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="FAQ Singkat">
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <Card className="rounded-lg" key={faq.question} size="sm">
              <CardHeader>
                <HelpCircle className="size-5 text-muted-foreground" />
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
