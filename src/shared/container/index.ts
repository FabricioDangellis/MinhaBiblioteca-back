import { IUserRepository } from "modules/users/domain/repositories/IUserRepository";
import UserRepository from "modules/users/infra/typeorm/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);