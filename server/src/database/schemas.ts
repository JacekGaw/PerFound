import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
  decimal,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  active: boolean("active").notNull().default(false),
  name: varchar("name", { length: 20 }),
  surname: varchar("surname", { length: 30 }),
  phone: varchar("phone", { length: 20 }), // Changed to varchar
  admin: boolean("admin").notNull().default(false),
});

export const transactionTypeEnum = pgEnum("transactionTypes", [
  "expense",
  "income",
]);

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  accountId: integer("accountId")
    .notNull()
    .references(() => accounts.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => categories.id),
  type: transactionTypeEnum("type").notNull(),
  description: text("description"),
  date: timestamp("date").notNull().defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull(),
  currencyCode: varchar("currencyCode", { length: 3 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  main: boolean("main").notNull().default(false)
});
