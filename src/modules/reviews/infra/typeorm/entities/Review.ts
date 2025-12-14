import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { Book } from "../../../../../modules/books/infra/typeorm/entities/Book";
import { User } from "../../../../../modules/users/infra/typeorm/entities/User";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  summary: string;

  @Column({ type: "int" })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.reviews, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Book, book => book.reviews, { onDelete: "CASCADE" })
  book: Book;
}
