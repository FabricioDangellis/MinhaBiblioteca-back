import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1765910250135 implements MigrationInterface {
    name = 'Book1765910250135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "publischer" TO "publisher"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "publisher" TO "publischer"`);
    }

}
