import { eq } from "drizzle-orm";

// Create
export const insertRecord = async (db: any, name: string, table: any) => {
  try {
    const existingRecord = await db
      .select()
      .from(table)
      .where(eq(table.name, name))
      .limit(1);
    if (existingRecord.length > 0)
      return {
        success: false,
        error: true,
        message: "This name is already exists",
      };

    await db.insert(table).values({ name });

    return { success: true, error: false };
  } catch (e) {
    console.error("Error in inserting record: ", e);
    throw e;
  }
};

export const insertAccount = async (
  db: any,
  name: string,
  balance: number,
  categoryId: number,
  currencyId: number,
  table: any
) => {
  try {
    const existingAccount = await db
      .select()
      .from(table)
      .where(eq(table.name, name))
      .limit(1);
    if (existingAccount.length > 0)
      return {
        success: false,
        error: true,
        message: "This name is already exists",
      };

    await db.insert(table).values({ name, balance, categoryId, currencyId });

    return { success: true, error: false };
  } catch (e) {
    console.error("Error in inserting account: ", e);
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
