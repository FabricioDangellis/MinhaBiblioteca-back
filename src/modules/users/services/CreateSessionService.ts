import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateSession } from "../domain/models/ICreateSession";
import { compare } from "bcryptjs";
import authConfig from "config/authConfig";
import { sign } from "jsonwebtoken";

@injectable()
class CreateSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: ICreateSession) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email não encontrado");
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new Error("Senha incorreta");
    }

    const token = sign({}, authConfig.jwt.secret!, {
        expiresIn: "30m",
        subject: user.id,
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            reviews: user.reviews,
        },
        token,
    }
  }
}

export default CreateSessionService;