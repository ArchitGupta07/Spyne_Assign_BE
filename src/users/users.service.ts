import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findOne(userId: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
      //   select: {
      //     id: true,
      //     email: true,
      //     password: true,
      //   },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
