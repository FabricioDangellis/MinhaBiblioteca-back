import { Book } from "modules/books/infra/typeorm/entities/Book";
import { ICreateBook } from "../models/ICreateBook";
import { ICreateBookRepository } from "../models/ICreateBookRepository";

export interface IBookRepository {
  create(data: ICreateBookRepository): Promise<Book>;
  findByTitle(title: string): Promise<Book | null>;
  findByAuthor(author: string): Promise<Book | null>;
  findAllByUser(userId: string): Promise<Book[]>;
  save(book: Book): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  softDelete(id: string): Promise<void>;
}
