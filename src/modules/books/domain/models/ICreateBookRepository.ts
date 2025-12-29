import { Review } from "modules/reviews/infra/typeorm/entities/Review";
import { User } from "modules/users/infra/typeorm/entities/User";

export interface ICreateBookRepository {
    title: string;
    author: string;
    publisher: string;
    genres:string[];
    coverUrl?: string;
    user: User
    reviews: Review[];
}