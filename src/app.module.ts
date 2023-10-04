import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './app/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BookModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
