import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { writeSuccessResponse } from "@/utils/response";
import usersService from "./users.service";
import { FilterUsersSchema } from "./users.schema";

export async function createUserHandler(req: Request, res: Response) {
  writeSuccessResponse(res, {
    code: StatusCodes.CREATED,
    message: "Create user successfully!",
    data: {
      user: await usersService.createUser(req.body),
    },
  });
}

export async function updateUserHandler(req: Request, res: Response) {
  writeSuccessResponse(res, {
    code: StatusCodes.OK,
    message: "Update user successfully!",
    data: {
      user: await usersService.updateUser({ id: Number(req.params.id), ...req.body }),
    },
  });
}

export async function getAllUsersHandler(req: Request, res: Response) {
  writeSuccessResponse(res, {
    code: StatusCodes.OK,
    message: "Get all users successfully!",
    data: {
      offset: req.query.offset,
      limit: req.query.limit,
      users: await usersService.getAllUsers(req.query as unknown as FilterUsersSchema),
    },
  });
}

export async function getUserHandler(req: Request, res: Response) {
  writeSuccessResponse(res, {
    code: StatusCodes.OK,
    message: "Get user details successfully!",
    data: {
      id: await usersService.getUserById(Number(req.params.id)),
    },
  });
}

export async function deleteUserHandler(req: Request, res: Response) {
  writeSuccessResponse(res, {
    code: StatusCodes.OK,
    message: "Delete user successfully!",
    data: {
      id: await usersService.deleteUserById(Number(req.params.id)),
    },
  });
}
