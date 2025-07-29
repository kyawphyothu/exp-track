import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

/*
currencies
  id
  name (MMK, VDN, USD)

account_categories
  id
  name (cash, bidv, binance, kpay, ayapay, ayabank)
  description
  currency_id

accounts
  id
  name
  category_id

income_categories
  id
  name (salary, initial)

incomes
  id
  description
  amount
  date
  account_id
  income_category_id

expense_categories
  id
  name (rent, food, transport)

expenses
  id
  description
  amount
  date
  account_id
  expense_category_id

*/

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

