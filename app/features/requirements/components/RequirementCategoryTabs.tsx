import {
  requirementCategories,
  requirementCategoryLabels,
  type RequirementCategory,
} from "~/features/requirements/data/kompre-requirements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export type CategoryFilter = RequirementCategory | "semua";

export function RequirementCategoryTabs({
  value,
  onChange,
}: {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}) {
  return (
    <>
      <div className="md:hidden">
        <Select
          onValueChange={(nextValue) => onChange(nextValue as CategoryFilter)}
          value={value}
        >
          <SelectTrigger className="h-11 w-full bg-white/80 dark:bg-neutral-900/70">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Kategori</SelectItem>
            {requirementCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {requirementCategoryLabels[category]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        className="hidden md:flex"
        onValueChange={(nextValue) => onChange(nextValue as CategoryFilter)}
        value={value}
      >
        <TabsList
          className="h-auto flex-wrap justify-start bg-neutral-200/70 dark:bg-neutral-900/80"
          variant="default"
        >
          <TabsTrigger value="semua">Semua</TabsTrigger>
          {requirementCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {requirementCategoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
