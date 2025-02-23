import usersRepository from "./users.repository";
import { BadRequestError, NotFoundError } from "@/utils/errors";
import { FilterUsersSchema, InsertUserSchema, UpdateUserSchema } from "./users.schema";
import { EMAIL_IS_EXISTED, USER_NOT_FOUND } from "./users.message";

export default {
  createUser: async function (values: InsertUserSchema) {
    const existingEmail = await usersRepository.findByEmail(values.email);
    if (existingEmail) {
      throw new BadRequestError(EMAIL_IS_EXISTED);
    }

    return usersRepository.create(values);
  },
  updateUser: async function (values: UpdateUserSchema) {
    const existingUser = await usersRepository.findById(values.id);
    if (!existingUser) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    return usersRepository.update(values);
  },
  getAllUsers: async function (query: FilterUsersSchema) {
    return await usersRepository.findAll(query);
  },
  getUserById: async function (userId: number) {
    const existingUser = await usersRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    return existingUser;
  },
  deleteUserById: async function (userId: number) {
    const existingUser = await usersRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundError(USER_NOT_FOUND);
    }

    return usersRepository.delete(userId);
  },
};
