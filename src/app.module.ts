import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entity/user.entity.js';
import { Product } from './entity/product.entity.js';
import { Category } from './entity/category.entity.js';
import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    TypeOrmModule.forRoot({type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User,Product,Category],
      synchronize: true,}),
      UserModule,
      CategoryModule,
      ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
