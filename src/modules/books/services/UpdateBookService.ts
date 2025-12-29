import { inject, injectable } from "tsyringe";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { Book } from "../infra/typeorm/entities/Book";
import { IUpdateBook } from "../domain/models/IUpdateBook";

@injectable()
class UpdateBookService {
  constructor(
    @inject("BookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute({
    id,
    title,
    author,
    publisher,
    genres,
    coverUrl,
  }: IUpdateBook): Promise<Book> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
        throw new Error('Livro não enconrado') 
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.publisher = publisher ?? book.publisher;
    book.genres = genres ?? book.genres;
    book.coverUrl = coverUrl ?? book.coverUrl;

    await this.bookRepository.save(book);

    return book;
  }
}

export default UpdateBookService;