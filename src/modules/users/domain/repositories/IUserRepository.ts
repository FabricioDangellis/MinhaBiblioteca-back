import { User } from "modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";

export interface IUserRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  softDelete(id: string): Promise<void>;
}
  