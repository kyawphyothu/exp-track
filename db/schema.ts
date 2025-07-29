import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const currenciesTable = sqliteTable('currencies', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  code: text().notNull().unique(),
  symbol: text(),
})

export const accountCategoriesTable = sqliteTable('account_categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
})

export const accountsTable = sqliteTable('accounts', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  balance: real().notNull(),
  categoryId: int('category_id').references(() => accountCategoriesTable.id).notNull(),
  currencyId: int('currency_id').references(() => currenciesTable.id).notNull(),
})

export const incomeCategoriesTable = sqliteTable('income_categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
})

export const incomesTable = sqliteTable('incomes', {
  id: int().primaryKey({ autoIncrement: true }),
  amount: real().notNull(),
  date: int('date', { mode: "timestamp" }).$default(() => new Date()),
  description: text(),
  accountId: int('account_id').references(() => accountsTable.id).notNull(),
  categoryId: int('category_id').references(() => incomeCategoriesTable.id).notNull(),
})

export const expenseCategoriesTable = sqliteTable('expense_categories', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
})

export const expensesTable = sqliteTable('expenses', {
  id: int().primaryKey({ autoIncrement: true }),
  amount: real().notNull(),
  date: int('date', { mode: "timestamp" }).$default(() => new Date()),
  description: text(),
  accountId: int('account_id').references(() => accountsTable.id).notNull(),
  categoryId: int('category_id').references(() => expenseCategoriesTable.id).notNull(),
})



// Relationships
export const currenciesRelations = relations(currenciesTable, ({ many }) => ({
  accounts: many(accountsTable)
}))

export const accountCategoriesRelations = relations(accountCategoriesTable, ({ many }) => ({
  accounts: many(accountsTable)
}))

export const accountsRelations = relations(accountsTable, ({ one, many }) => ({
  category: one(accountCategoriesTable, {
    fields: [accountsTable.categoryId],
    references: [accountCategoriesTable.id],
  }),
  currency: one(currenciesTable, {
    fields: [accountsTable.currencyId],
    references: [currenciesTable.id],
  }),
  incomes: many(incomesTable),
  expenses: many(expensesTable),
}));

export const incomeCategoriesRelations = relations(incomeCategoriesTable, ({ many }) => ({
  incomes: many(incomesTable),
}));

export const incomesRelations = relations(incomesTable, ({ one }) => ({
  account: one(accountsTable, {
    fields: [incomesTable.accountId],
    references: [accountsTable.id],
  }),
  category: one(incomeCategoriesTable, {
    fields: [incomesTable.categoryId],
    references: [incomeCategoriesTable.id],
  }),
}));

export const expenseCategoriesRelations = relations(expenseCategoriesTable, ({ many }) => ({
  expenses: many(expensesTable),
}));

export const expensesRelations = relations(expensesTable, ({ one }) => ({
  account: one(accountsTable, {
    fields: [expensesTable.accountId],
    references: [accountsTable.id],
  }),
  category: one(expenseCategoriesTable, {
    fields: [expensesTable.categoryId],
    references: [expenseCategoriesTable.id],
  }),
}));


// Types
export type Currency = typeof currenciesTable.$inferSelect;
export type NewCurrency = typeof currenciesTable.$inferInsert;

export type AccountCategory = typeof accountCategoriesTable.$inferSelect;
export type NewAccountCategory = typeof accountCategoriesTable.$inferInsert;

export type Account = typeof accountsTable.$inferSelect;
export type NewAccount = typeof accountsTable.$inferInsert;

export type IncomeCategory = typeof incomeCategoriesTable.$inferSelect;
export type NewIncomeCategory = typeof incomeCategoriesTable.$inferInsert;

export type Income = typeof incomesTable.$inferSelect;
export type NewIncome = typeof incomesTable.$inferInsert;

export type ExpenseCategory = typeof expenseCategoriesTable.$inferSelect;
export type NewExpenseCategory = typeof expenseCategoriesTable.$inferInsert;

export type Expense = typeof expensesTable.$inferSelect;
export type NewExpense = typeof expensesTable.$inferInsert;