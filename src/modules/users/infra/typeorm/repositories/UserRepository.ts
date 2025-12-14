import { IUserRepository } from "modules/users/domain/repositories/IUserRepository";
import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "shared/infra/http/database/data-source";
import { ICreateUser } from "modules/users/domain/models/ICreateUser";

@injectable()
class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async create({ name, email, password, reviews }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      reviews,
    });

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { email } });
  }

  async findByName(name: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { name } });
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}

export default UserRepository;
