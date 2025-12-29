import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookGenres1765891113101 implements MigrationInterface {
    name = 'AddBookGenres1765891113101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "genres" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "genres"`);
    }

}
