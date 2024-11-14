import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('cars')
export class CarsController {
  cloudinaryService: any;
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @Version('1')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  @ApiOperation({ summary: 'Create a new car with images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Car details along with images',
    type: CreateCarDto,
  })
  @ApiResponse({ status: 201, description: 'Car successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create car.' })
  async create(
    @Body() createCarDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    try {
      if (typeof createCarDto.tags === 'string') {
        const tagNames = JSON.parse(createCarDto.tags) as string[];

        // Transform into Prisma's connectOrCreate format
        createCarDto.tags = {
          connectOrCreate: tagNames.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        };
      }

      const userId = parseInt(createCarDto.user as unknown as string, 10);

      const carData: Prisma.CarCreateInput = {
        ...createCarDto,
        user: {
          connect: { id: userId },
        },
      };
      if (files) {
        console.log('files exists');
        console.log(files);
      }

      console.log(carData);
      const car = await this.carsService.create(carData, files?.images);
      return res.status(201).json({
        success: true,
        data: car,
      });
    } catch (error) {
      console.error('Error occurred in creating car entry:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create car',
        error: error.message,
      });
    }
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Retrieve all cars' })
  @ApiResponse({ status: 200, description: 'Cars retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve cars.' })
  async findAll(@Res() res: Response) {
    try {
      const cars = await this.carsService.findAll();
      return res.status(HttpStatus.OK).json({
        success: true,
        data: cars,
      });
    } catch (error) {
      console.error('Error occurred in retrieving cars:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve cars',
        error: error.message,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 }, // Change maxCount if you want more images
    ]),
  )
  @ApiOperation({ summary: 'Update car details' })
  @ApiResponse({ status: 200, description: 'Car successfully updated.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  @ApiResponse({ status: 500, description: 'Failed to update car.' })
  async update(
    @Param('id', ParseIntPipe) id: number, // Car ID
    @Body() updateCarDto, // Data to update
    @UploadedFiles() files: { images?: Express.Multer.File[] }, // Files uploaded
    @Res() res: Response,
  ) {
    try {
      const car = await this.carsService.findOne(id);
      if (!car) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Car not found',
        });
      }

      // let imageUrls: string[] = [];
      // if (files?.images) {
      //   const imageUploadResults = await this.cloudinaryService.uploadImages(
      //     files.images,
      //   );
      //   imageUrls = imageUploadResults.map((result) => result.secure_url);
      // }

      const updatedCar = await this.carsService.update(
        id,
        updateCarDto,
        files?.images,
      );

      return res.status(HttpStatus.OK).json({
        success: true,
        data: updatedCar,
      });
    } catch (error) {
      console.error('Error occurred in updating car:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to update car',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
