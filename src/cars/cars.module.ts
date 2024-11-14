import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Set the directory where uploaded files are stored
    }),
    DatabaseModule,
    CloudinaryModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
