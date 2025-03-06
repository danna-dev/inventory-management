import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexProduct1741223600994 implements MigrationInterface {
    name = 'CreateIndexProduct1741223600994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_PRODUCT_CATEGORY_PRICE" ON "products" ("category", "price") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_PRODUCT_CATEGORY_PRICE"`);
    }

}
