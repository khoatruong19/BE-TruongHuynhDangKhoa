import { users } from "@/store/db/schema";
import { createUpdateSchema, createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type UsersColumn = keyof typeof users.$inferSelect;
const userColumns = Object.keys(users).filter((key) => key !== "_" && key !== "enableRLS") as UsersColumn[];

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        isActive:
 *          type: boolean
 *        email:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserBody:
 *      type: object
 *      required:
 *        - first_name
 *        - last_name
 *        - email
 *      optional:
 *        - is_active
 *      properties:
 *        first_name:
 *          type: string
 *          default: Jane
 *        last_name:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        is_active:
 *          type: boolean
 *          default: true
 */
export const createUserBody = z
  .object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z
      .string()
      .email()
      .transform((email) => email.toLowerCase()),
    is_active: z.boolean().optional(),
  })
  .transform((user) => ({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    isActive: user.is_active,
  }));

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateUserBody:
 *      type: object
 *      optional:
 *        - first_name
 *        - last_name
 *        - is_active
 *      properties:
 *        first_name:
 *          type: string
 *          default: Jane
 *        last_name:
 *          type: string
 *          default: Doe
 *        is_active:
 *          type: boolean
 *          default: true
 */
export const updateUserBody = z
  .object({
    first_name: z.string().min(2).optional(),
    last_name: z.string().min(2).optional(),
    is_active: z.boolean().optional(),
  })
  .transform((user) => ({
    firstName: user.first_name,
    lastName: user.last_name,
    isActive: user.is_active,
  }));

/**
 * @openapi
 * components:
 *  schemas:
 *    UserIdParams:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: number
 *          default: 1
 *    DeleteUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 */
export const userIdParams = z.object({
  id: z.coerce.number().min(1),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    FilterUsersQuery:
 *      type: object
 *      optional:
 *        - limit
 *        - offset
 *        - is_active
 *        - order_by
 *        - sort
 *      properties:
 *        limit:
 *          type: number
 *          default: 10
 *        offset:
 *          type: number
 *          default: 0
 *        is_active:
 *          type: boolean
 *          default: none
 *        order_by:
 *          type: string
 *          default: none
 *        sort:
 *          type: string
 *          default: none
 */
export const filterUsersQuery = z
  .object({
    limit: z.coerce.number().min(1).optional().default(10),
    offset: z.coerce.number().min(0).optional().default(0),
    is_active: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
    order_by: z.enum(userColumns as [string, ...string[]]).optional(),
    sort: z.enum(["asc", "desc"]).optional(),
  })
  .transform((query) => ({
    limit: query.limit,
    offset: query.offset,
    isActive: query.is_active,
    orderBy: query.order_by as UsersColumn,
    sort: query.sort,
  }));
export type FilterUsersSchema = z.infer<typeof filterUsersQuery>;

const insertUserSchema = createInsertSchema(users);
export type InsertUserSchema = z.infer<typeof insertUserSchema>;

const updateUserSchema = createUpdateSchema(users);
export type UpdateUserSchema = z.infer<typeof updateUserSchema> & {
  id: number;
};
