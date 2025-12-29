import { IBookRepository } from "modules/books/domain/repositories/IBookRepository";
import { injectable } from "tsyringe";
import { Book } from "../entities/Book";
import { Repository } from "typeorm";
import { AppDataSource } from "shared/infra/http/database/data-source";
import { ICreateBookRepository } from "modules/books/domain/models/ICreateBookRepository";

@injectable()
class BookRepository implements IBookRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Book);
  }

  async create({
    title,
    author,
    publisher,
    genres,
    coverUrl,
    reviews,
    user,
  }: ICreateBookRepository): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      author,
      publisher,
      genres,
      coverUrl,
      reviews,
      user,
    }); 

    await this.ormRepository.save(book);

    return book;
  }

  async findByTitle(title: string): Promise<Book | null> {
    return await this.ormRepository.findOne({ where: { title } });
  }

  async findByAuthor(author: string): Promise<Book | null> {
    return await this.ormRepository.findOne({ where: { author } });
  }

  async findAllByUser(userId: string): Promise<Book[]> {
    return await this.ormRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["reviews"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async save(book: Book): Promise<Book> {
    return await this.ormRepository.save(book);
  }

  async findById(id: string): Promise<Book | null> {
    return await this.ormRepository.findOne({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}

export default BookRepository;
