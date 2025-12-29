import { inject, injectable } from "tsyringe";
import { IBookRepository } from "../domain/repositories/IBookRepository";
import { Book } from "../infra/typeorm/entities/Book";

@injectable()
class ListBookService {
    constructor(
        @inject("BookRepository")
        private bookRepository: IBookRepository
    ){}

    async execute(userId: string): Promise<Book[]> {
        return await this.bookRepository.findAllByUser(userId)
    }
}

export default ListBookService;