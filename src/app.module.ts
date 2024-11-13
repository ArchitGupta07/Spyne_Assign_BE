import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { ImagesModule } from './images/images.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, CarsModule, ImagesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
