import { UserCreateDto } from './dto/user-create.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  readonly logger = new Logger(UsersService.name);

  async findUnique(id: number): Promise<User | null> {
    const where: Prisma.UserWhereUniqueInput = { id };

    return this.prisma.user.findUnique({
      where
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    try {
      const data: Prisma.UserCreateInput = { ...userCreateDto };
      return this.prisma.user.create({ data });
    } catch (error) {
      this.logger.error(`createUser::error: ${JSON.stringify(error, null, 2)}`);
    }
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };
    const data: Prisma.UserUpdateInput = { ...userUpdateDto };

    return this.prisma.user.update({ data, where });
  }

  async deleteUser(id: number): Promise<User> {
    const where: Prisma.UserWhereUniqueInput = { id };

    return this.prisma.user.delete({ where });
  }
}
