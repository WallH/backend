import { DataSource } from 'typeorm';
import { join } from 'path';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env` });
export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});