import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { User } from "../infra/typeorm/entities/User";
import { ICreateUser } from "../domain/models/ICreateUser";
import { hash } from "bcryptjs";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    reviews,
  }: ICreateUser): Promise<User> {
    const emailExist = await this.userRepository.findByEmail(email);

    if(emailExist) {
        throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        reviews,
    })

    return user;
  }
}

export default CreateUserService;
