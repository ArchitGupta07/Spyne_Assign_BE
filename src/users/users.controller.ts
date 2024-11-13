import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Version,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  @Version('1')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create user.' })
  async create(
    @Body() creatUserDto: Prisma.UserCreateInput,
    @Res() res: Response,
  ) {
    try {
      console.log(creatUserDto);
      const user = await this.userService.create(creatUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create gift',
        error: error.message,
      });
    }
  }
}
