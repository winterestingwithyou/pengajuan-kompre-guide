import Dexie, { type EntityTable } from "dexie";

export type ChecklistItem = {
  requirementId: string;
  checked: boolean;
  fileUrl?: string;
  note?: string;
  updatedAt: string;
};

export const db = new Dexie("kompre-guide-db") as Dexie & {
  checklist: EntityTable<ChecklistItem, "requirementId">;
};

db.version(1).stores({
  checklist: "requirementId, checked, updatedAt",
});
