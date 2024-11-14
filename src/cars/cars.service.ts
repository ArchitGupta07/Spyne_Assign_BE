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
      const imageUploadResults =
        await this.cloudinaryService.uploadImages(files);

      const imageUrls = imageUploadResults.map((result) => result.secure_url);

      return await this.databaseService.car.create({
        data: {
          ...createCarDto,
          images: {
            create: imageUrls.map((url) => ({ url })),
          },
        },
      });
    } catch (error) {
      throw new Error(`Error creating car: ${error}`);
    }
  }

  async findAll() {
    const cars = await this.databaseService.car.findMany();
    if (!cars) {
      throw new NotFoundException('No cars found');
    }
    return cars;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
