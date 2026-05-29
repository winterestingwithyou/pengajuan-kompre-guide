import { useLiveQuery } from "dexie-react-hooks";

import { db, type ChecklistItem } from "~/lib/db";

export function useChecklist() {
  const items = useLiveQuery(() => db.checklist.toArray(), []);

  async function setChecked(requirementId: string, checked: boolean) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked,
      fileUrl: existing?.fileUrl ?? "",
      note: existing?.note ?? "",
      updatedAt: new Date().toISOString(),
    });
  }

  async function setFileUrl(requirementId: string, fileUrl: string) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked: existing?.checked ?? false,
      fileUrl,
      note: existing?.note ?? "",
      updatedAt: new Date().toISOString(),
    });
  }

  async function setNote(requirementId: string, note: string) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked: existing?.checked ?? false,
      fileUrl: existing?.fileUrl ?? "",
      note,
      updatedAt: new Date().toISOString(),
    });
  }

  async function resetChecklist() {
    await db.checklist.clear();
  }

  function getItem(requirementId: string): ChecklistItem | undefined {
    return items?.find((item) => item.requirementId === requirementId);
  }

  return {
    items: items ?? [],
    getItem,
    setChecked,
    setFileUrl,
    setNote,
    resetChecklist,
  };
}
