import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import { isAuthenticated } from "shared/infra/http/middleware/isAuthenticated";

const userController = new UserController();
const userRoutes = Router();

userRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    }),
    userController.create
);

userRoutes.post(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required(),
        }),
        [Segments.BODY]: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
        })
    }),
    isAuthenticated,
    userController.update
);

userRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required()
        })
    }),
    isAuthenticated,
    userController.delete
);

export default userRoutes;