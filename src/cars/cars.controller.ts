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
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 }, // Change maxCount if you want more images
    ]),
  )
  @Version('1')
  @ApiOperation({ summary: 'Create a new gift' })
  @ApiBody({ type: CreateCarDto })
  @ApiResponse({ status: 201, description: 'Gift successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create gift.' })
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Res() res: Response,
  ) {
    try {
      const car = await this.carsService.create(createCarDto, files.images);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: car,
      });
    } catch (error) {
      console.error('error occured in creating car entry :', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
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
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
