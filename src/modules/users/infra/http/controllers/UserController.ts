import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "modules/users/services/CreateUserService";
import DeleteUserService from "modules/users/services/DeleteUserService";
import UpdateUserService from "modules/users/services/UpdateUserService";
import { container } from "tsyringe";

class UserController {
  async create(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      reviews: [],
    });

    response.json(instanceToInstance(user));
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, email } = request.body;

    try {
      const updateUserService = container.resolve(UpdateUserService);

      const user = await updateUserService.execute({
        id,
        name,
        email,
      });

      response.json(user);
    } catch (error: any) {
      response.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const deleteUserService = container.resolve(DeleteUserService);

      const user = await deleteUserService.execute(id);

      response.json(user);
    } catch (error: any) {
      response.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default UserController;