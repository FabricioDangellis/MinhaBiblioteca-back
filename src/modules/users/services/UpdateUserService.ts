import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { User } from "../infra/typeorm/entities/User";
import { IUpdateUser } from "../domain/models/IUpdateUser";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    name,
    email,
  }: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findById(id);

    if(!user) {
        throw new Error('Usuário não encontrado')
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
