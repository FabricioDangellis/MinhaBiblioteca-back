import { Review } from "modules/reviews/infra/typeorm/entities/Review";

export interface IUpdateUser {
    id: string;
    name: string;
    email: string;
}