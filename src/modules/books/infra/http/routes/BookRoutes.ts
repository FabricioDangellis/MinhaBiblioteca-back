import { Router } from "express";
import BookController from "../controllers/BookController";
import { celebrate, Joi, Segments } from "celebrate";
import { isAuthenticated } from "shared/infra/http/middleware/isAuthenticated";

const bookController = new BookController();
const bookRoutes = Router();

bookRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      publisher: Joi.string().required(),
      coverUrl: Joi.string().uri().optional(),
      genres: Joi.array().items(Joi.string().min(2)).min(1).required(),
    }),
  }),
  isAuthenticated,
  bookController.create
);

bookRoutes.get("/my-books", isAuthenticated, bookController.list);

bookRoutes.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object({
      title: Joi.string(),
      author: Joi.string(),
      publisher: Joi.string(),
      coverUrl: Joi.string().uri(),
      genres: Joi.array().items(Joi.string()),
    }),
  }),
  isAuthenticated,
  bookController.update
);

bookRoutes.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  isAuthenticated,
  bookController.delete
);

export default bookRoutes;
