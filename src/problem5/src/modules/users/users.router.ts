import { Router } from "express";
import { createUserBody, filterUsersQuery, updateUserBody, userIdParams } from "./users.schema";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
} from "./users.controller";
import { asyncHandler } from "@/utils/helpers";
import { validateRequest } from "@/utils/middlewares";

const router = Router();

/**
 * @openapi
 * '/v1/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserBody'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.post(
  "",
  validateRequest({
    body: createUserBody,
  }),
  asyncHandler(createUserHandler)
);

/**
 * @openapi
 * '/v1/users/{id}':
 *   patch:
 *     tags:
 *       - User
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserBody'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *        description: Not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  validateRequest({
    body: updateUserBody,
    params: userIdParams,
  }),
  asyncHandler(updateUserHandler)
);

/**
 * @openapi
 * '/v1/users':
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Max number of users returned
 *         required: false
 *         schema:
 *           type: integer
 *       - name: offset
 *         in: query
 *         description: Number of users to be skipped
 *         required: false
 *         schema:
 *           type: integer
 *       - name: is_active
 *         in: query
 *         description: Filter users by their active status
 *         required: false
 *         schema:
 *           type: boolean
 *       - name: order_by
 *         in: query
 *         description: Order users by table columns
 *         required: false
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         description: Sort users by ascending or decreasing order
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *        description: Not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "",
  validateRequest({
    query: filterUsersQuery,
  }),
  asyncHandler(getAllUsersHandler)
);

/**
 * @openapi
 * '/v1/users/{id}':
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to get details
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *        description: Not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  validateRequest({
    params: userIdParams,
  }),
  asyncHandler(getUserHandler)
);

/**
 * @openapi
 * '/v1/users/{id}':
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
 *       400:
 *         description: Bad request
 *       404:
 *        description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  validateRequest({
    params: userIdParams,
  }),
  asyncHandler(deleteUserHandler)
);

export { router as usersRouter };
