import { inject, injectable } from "tsyringe";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { Book } from "../infra/typeorm/entities/Book";

@injectable()
class DeleteBookService {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error("Livro não encontrado");
    }

    await this.bookRepository.softDelete(book.id);

    return book;
  }
}

export default DeleteBookService;
