import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialmigration1712512452056 implements MigrationInterface {
    name = 'Initialmigration1712512452056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nombre\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL, \`activa\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`codigo\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`precio\` int NOT NULL, \`talle\` int NOT NULL, \`categoriaId\` int NULL, UNIQUE INDEX \`IDX_a5f2358541cce81b1b98de2d10\` (\`codigo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_4571d9be1660f363029320af4da\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO category (nombre, descripcion, activa) VALUES ('Remeras', 'Remeras de algodon', 1)`);
        await queryRunner.query(`INSERT INTO category (nombre, descripcion, activa) VALUES ('Musculosas', 'Musculosas', 1)`);
        await queryRunner.query(`INSERT INTO category (nombre, descripcion, activa) VALUES ('Remeras Fit', 'Remeras Fuark', 1)`);
        await queryRunner.query(`INSERT INTO category (nombre, descripcion, activa) VALUES ('Remeras Fit 2', 'Remeras Shark', 0)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_4571d9be1660f363029320af4da\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5f2358541cce81b1b98de2d10\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
