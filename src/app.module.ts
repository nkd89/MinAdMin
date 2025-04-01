import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { DocumentsController } from './controllers/documents.controller';
import { UsersService } from './services/users.service';
import { DocumentsService } from './services/documnets.service';
import { User } from './entities/user.entity';
import { Document } from './entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'min_ad_min',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Document]),
  ],
  controllers: [AppController, UsersController, DocumentsController],
  providers: [AppService, UsersService, DocumentsService],
})
export class AppModule {}
