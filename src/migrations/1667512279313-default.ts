import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667512279313 implements MigrationInterface {
    name = 'default1667512279313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "livro" ("id" SERIAL NOT NULL, "titulo" text NOT NULL, "autor" text NOT NULL, "ano" text NOT NULL, "id_biblioteca" integer, CONSTRAINT "PK_5601163ea69da49108c4f7854cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "biblioteca" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "url" text NOT NULL, CONSTRAINT "PK_3834f5c1574aa906b3e00ee87d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "livro" ADD CONSTRAINT "FK_d5e9d1c12a682ade22e2f727e6c" FOREIGN KEY ("id_biblioteca") REFERENCES "biblioteca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro" DROP CONSTRAINT "FK_d5e9d1c12a682ade22e2f727e6c"`);
        await queryRunner.query(`DROP TABLE "biblioteca"`);
        await queryRunner.query(`DROP TABLE "livro"`);
    }

}
