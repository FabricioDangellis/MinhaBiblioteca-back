import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateBookService from "modules/books/services/CreateBookService";
import DeleteBookService from "modules/books/services/DeleteBookService";
import ListBooksService from "modules/books/services/ListBooksService";
import UpdateBookService from "modules/books/services/UpdateBookService";
import { container } from "tsyringe";

class BookController {
  async create(request: Request, response: Response): Promise<void> {
    const { title, author, publisher, genres, coverUrl, reviews } =
      request.body;
    
      const userId = request.user.id;

    const createBookService = container.resolve(CreateBookService);

    const book = await createBookService.execute({
      title,
      author,
      publisher,
      genres,
      coverUrl,
      reviews,
      userId,
    });

    response.json(instanceToInstance(book));
  }

  async list(request: Request, response: Response): Promise<void> {
    const userId = request.user.id;

    const listUserBooks = container.resolve(ListBooksService);

    const books = await listUserBooks.execute(userId);

    response.json(books);
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { title, author, publisher, genres, coverUrl } = request.body;

    try {
      const updateBookService = container.resolve(UpdateBookService);

      const book = await updateBookService.execute({
        id,
        title,
        author,
        publisher,
        genres,
        coverUrl,
      });

      response.json(book);
    } catch (error: any) {
      response.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const deleteBookService = container.resolve(DeleteBookService);

      const book = await deleteBookService.execute(id);

      response.json(book);
    } catch (error: any) {
      response.status(error.statusCode || 500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default BookController;
