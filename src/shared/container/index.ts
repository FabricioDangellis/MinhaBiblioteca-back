import { IBookRepository } from "modules/books/domain/repositories/IBookRepository";
import BookRepository from "modules/books/infra/typeorm/repositories/BookRepository";
import { IUserRepository } from "modules/users/domain/repositories/IUserRepository";
import UserRepository from "modules/users/infra/typeorm/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IBookRepository>(
  'BookRepository',
  BookRepository
);