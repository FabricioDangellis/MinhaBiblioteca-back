import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate, Joi, Segments } from "celebrate";

const sessionController = new SessionController();
const sessionRoutes = Router();

sessionRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        }),
    }),
    sessionController.create,
)

export default sessionRoutes;