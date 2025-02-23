import { users } from "src/store/db/schema";
import { asc, desc, eq, InferColumnsDataTypes } from "drizzle-orm";
import { getDB } from "@/store/index";
import { FilterUsersSchema, InsertUserSchema, UpdateUserSchema, UsersColumn } from "./users.schema";
import { PgSelect, PgSelectQueryBuilder, PgTable } from "drizzle-orm/pg-core";
import { throwDatabaseError } from "@/utils/helpers";

// query builders
function withActive<T extends PgSelectQueryBuilder>(qb: T, isActive: boolean) {
  return qb.where(eq(users.isActive, isActive));
}
function withOrdering<T extends PgSelect>(qb: T, orderBy: UsersColumn, sort = "asc") {
  if (sort === "asc") return qb.orderBy(asc(users[orderBy]));
  return qb.orderBy(desc(users[orderBy]));
}
function withPagination<T extends PgSelect>(qb: T, limit = 10, offset = 0) {
  return qb.limit(limit).offset(offset);
}

export default {
  create: async function (values: InsertUserSchema) {
    try {
      const result = await getDB().insert(users).values(values).returning();
      return result[0];
    } catch (error) {
      throwDatabaseError(error, "create: failed to create user");
    }
  },
  update: async function (values: UpdateUserSchema) {
    try {
      const { id, ...rest } = values;
      const result = await getDB().update(users).set(rest).where(eq(users.id, id)).returning();
      return result[0];
    } catch (error) {
      throwDatabaseError(error, "update: failed to update user");
    }
  },
  delete: async function (id: number) {
    try {
      await getDB().delete(users).where(eq(users.id, id));
      return id;
    } catch (error) {
      throwDatabaseError(error, "delete: failed to delete user");
    }
  },
  findById: async function (id: number) {
    try {
      const result = await getDB().query.users.findFirst({
        where: eq(users.id, id),
      });
      return result;
    } catch (error) {
      throwDatabaseError(error, "getById: failed to get user by id");
    }
  },
  findAll: async function ({ limit, offset, isActive, orderBy = "id", sort = "asc" }: FilterUsersSchema) {
    try {
      let query = getDB().select().from(users).$dynamic();
      query = withPagination(query, limit, offset);
      query = withOrdering(query, orderBy, sort);
      if (isActive !== undefined) {
        query = withActive(query, isActive);
      }

      return await query;
    } catch (error) {
      throwDatabaseError(error, "findAll: failed to get all users");
    }
  },
  findByEmail: async function (email: string) {
    try {
      const result = await getDB().query.users.findFirst({
        where: eq(users.email, email),
      });
      return result;
    } catch (error) {
      throwDatabaseError(error, "findByEmail: failed to find user by email");
    }
  },
};
