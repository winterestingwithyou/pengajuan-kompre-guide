import { FileText } from "lucide-react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { LetterTemplate } from "~/features/letters/data/letter-templates";

export function LetterTemplateCard({ template }: { template: LetterTemplate }) {
  return (
    <Card className="soft-panel rounded-lg" size="sm">
      <CardHeader>
        <CardTitle>{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-6 text-muted-foreground">
          {template.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/generator/${template.id}`}>
            <FileText className="size-4" />
            Generate Surat
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
