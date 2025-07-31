import { accountsTable, currenciesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// Currency
export const deleteCurrency = async (
  db: any,
  code: string,
  setShowModal: (showModal: boolean) => void
) => {
  try {
    await db.delete(currenciesTable).where(eq(currenciesTable.code, code));
  } catch (e) {
    console.error("Error in deleting currency: ", e);
  } finally {
    setShowModal(false);
  }
};

// Account
export const deleteAccount = async (
  db: any,
  id: number,
  setShowModal: (showModal: boolean) => void
) => {
  try {
    await db.delete(accountsTable).where(eq(accountsTable.id, id));
  } catch (e) {
    console.error("Error in deleting currency: ", e);
  } finally {
    setShowModal(false);
  }
};
