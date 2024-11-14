import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(
    createCarDto: Prisma.CarCreateInput,
    files: Express.Multer.File[],
  ) {
    try {
      // Upload images to Cloudinary
      const imageUploadResults =
        await this.cloudinaryService.uploadImages(files);
      const imageUrls = imageUploadResults.map((result) => result.secure_url);

      // Create car entry in the database
      return await this.databaseService.car.create({
        data: {
          ...createCarDto,
          images: {
            create: imageUrls.map((url) => ({ url })),
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma Client Known Request Error:', {
          code: error.code,
          meta: error.meta,
          message: error.message,
        });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error('Prisma Client Unknown Request Error:', error.message);
      } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.error('Prisma Client Rust Panic Error:', error.message);
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error('Prisma Client Initialization Error:', error.message);
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error('Prisma Client Validation Error:', error.message);
      } else {
        console.error('Unknown error:', error.message);
      }
      throw new Error(`Error creating car: ${error.message}`);
    }
  }

  async findAll() {
    const cars = await this.databaseService.car.findMany();
    if (!cars) {
      throw new NotFoundException('No cars found');
    }
    return cars;
  }

  async findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  async update(
    id: number,
    updateCarDto: Prisma.CarUpdateInput,
    files: Express.Multer.File[],
  ) {
    const imageUploadResults = await this.cloudinaryService.uploadImages(files);
    const imageUrls = imageUploadResults.map((result) => result.secure_url);
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
