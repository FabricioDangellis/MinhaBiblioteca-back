import { User } from "../../../../users/infra/typeorm/entities/User";
import { Review } from "../../../../reviews/infra/typeorm/entities/Review";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column("text", { array: true })
  genres: string[];

  @Column({ nullable: true })
  coverUrl?: string;

  @ManyToOne(() => User, user => user.books, {onDelete: "CASCADE"})
  user: User;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
