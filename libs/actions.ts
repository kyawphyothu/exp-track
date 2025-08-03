import { eq } from "drizzle-orm";

// Create
export const insertRecord = async (db: any, name: string, table: any) => {
  try {
    await db.insert(table).values({ name });
  } catch (e) {
    console.error("Error in inserting record: ", e);
    throw e;
  }
};

// Delete
export const deleteRecord = async (
  db: any,
  item: {
    id: number;
    name: string;
    href?: any;
  },
  table: any,
  setShowAlertDialog?: (showModal: boolean) => void
) => {
  try {
    await db.delete(table).where(eq(table.id, item.id));
  } catch (e) {
    console.error("Error in deleting record: ", e);
    throw e;
  } finally {
    if (setShowAlertDialog) setShowAlertDialog(false);
  }
};

// Update
export const updateRecord = async (
  db: any,
  id: number,
  name: string,
  table: any
) => {
  try {
    await db.update(table).set({ name }).where(eq(table.id, id));
  } catch (e) {
    console.error("Error in updating record: ", e);
    throw e;
  }
};
