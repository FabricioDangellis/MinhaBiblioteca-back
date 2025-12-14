import { Review } from "modules/reviews/infra/typeorm/entities/Review";

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    reviews: Review[];
}