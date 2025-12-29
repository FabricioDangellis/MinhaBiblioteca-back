import { Review } from "modules/reviews/infra/typeorm/entities/Review";

export interface IUpdateBook {
    id: string;
    title: string;
    author: string;
    publisher: string;
    genres: string[];
    coverUrl?: string;
}