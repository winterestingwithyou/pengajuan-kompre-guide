import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

import { CREATOR_GITHUB_URL, GOOGLE_FORM_URL } from "~/lib/constants";

export function AppFooter() {
  return (
    <footer className="border-t border-border/70 bg-neutral-200/40 dark:bg-neutral-950/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p>
            Panduan ini dikhususkan untuk mahasiswa D3 Manajemen Informatika
            Universitas Sriwijaya. Pengajuan resmi tetap melalui Google Form.
          </p>
          <a
            className="inline-flex items-center gap-2 hover:text-foreground"
            href={CREATOR_GITHUB_URL}
            rel="noreferrer"
            target="_blank"
          >
            <ExternalLink className="size-4" />
            Dibuat oleh @winterestingwithyou
          </a>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-foreground" to="/panduan">
            Panduan
          </Link>
          <Link className="hover:text-foreground" to="/checklist">
            Checklist
          </Link>
          <a
            className="hover:text-foreground"
            href={GOOGLE_FORM_URL}
            rel="noreferrer"
            target="_blank"
          >
            Google Form resmi
          </a>
        </div>
      </div>
    </footer>
  );
}
