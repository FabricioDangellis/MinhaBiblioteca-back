import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueFromAuthor1765818682722 implements MigrationInterface {
    name = 'RemoveUniqueFromAuthor1765818682722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "UQ_4675aad2c57a7a793d26afbae99"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "UQ_4675aad2c57a7a793d26afbae99" UNIQUE ("author")`);
    }

}
