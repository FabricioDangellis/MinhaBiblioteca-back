import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";

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
    userController.update
);

userRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required()
        })
    }),
    userController.delete
);

export default userRoutes;