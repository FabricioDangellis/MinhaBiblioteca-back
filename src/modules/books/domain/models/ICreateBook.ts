import { Review } from "modules/reviews/infra/typeorm/entities/Review";

export interface ICreateBook {
    title: string;
    author: string;
    publisher: string;
    genres:string[];
    coverUrl?: string;
    userId: string;
    reviews: Review[];
}