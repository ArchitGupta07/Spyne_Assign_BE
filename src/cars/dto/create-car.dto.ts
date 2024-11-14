import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'The title of the car',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A brief description of the car',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Array of image URLs or paths for the car',
  })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({
    description: 'The type of the car',
  })
  @IsString()
  @IsNotEmpty()
  carType: string;

  @ApiProperty({
    description: 'The company that manufactures the car',
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'The dealer of the car',
  })
  @IsString()
  @IsNotEmpty()
  dealer: string;

  @ApiPropertyOptional({
    description: 'Array of tags related to the car',
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'The ID of the user creating the car record',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
