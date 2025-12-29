import { inject, injectable } from "tsyringe";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { ICreateBook } from "../domain/models/ICreateBook";
import { Book } from "../infra/typeorm/entities/Book";
import { IUserRepository } from "modules/users/domain/repositories/IUserRepository";

@injectable()
class CreateBookService {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    title,
    author,
    publisher,
    genres,
    coverUrl,
    userId,
  }: ICreateBook): Promise<Book> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const book = await this.bookRepository.create({
      title,
      author,
      publisher,
      genres,
      coverUrl,
      user,
      reviews: []
    });

    return book;
  }
}

export default CreateBookService;