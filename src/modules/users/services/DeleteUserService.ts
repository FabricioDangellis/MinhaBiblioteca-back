import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.softDelete(user.id);

    return user;
  }
}

export default DeleteUserService;
