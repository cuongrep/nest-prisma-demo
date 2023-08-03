import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  readonly logger = new Logger(UsersController.name);

  @Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserModel> {
    try {
      this.logger.log(`create::userCreateDto: ${JSON.stringify(userCreateDto, null, 2)}`);

      return this.usersService.createUser(userCreateDto);
    } catch (error) {
      this.logger.error(`create::error: ${JSON.stringify(error, null, 2)}`);
      throw new BadRequestException(error.message);
    }
  }
}
