import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ApiResponseInterceptor } from './interceptors/apiresponse.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: false,
      //autoLoadEntities: true,
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false
    }),
    TypeOrmModule.forFeature([Category,Product])
  ],
  controllers: [ProductController],
  providers: [ApiResponseInterceptor,ProductService],
})
export class AppModule {}
