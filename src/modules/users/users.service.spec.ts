import { UserCreateDto } from './dto/user-create.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismockClient } from 'prismock';
import { PrismaService } from '../../common/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';

let app: INestApplication;

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const prismock = new PrismockClient();

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService]
    })
      .overrideProvider(PrismaService)
      .useValue(prismock)
      .compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should return the new created User', async () => {
      const userCreateDto: UserCreateDto = {
        email: `example@gmail.com`,
        name: `example`
      };

      const result = await service.createUser(userCreateDto);
      console.log(`createUser::result`, result);

      const expectedResult = { id: 1, email: 'example@gmail.com', name: 'example' };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findUnique', () => {
    it('should return a User by a given id', async () => {
      const expectedResult = { id: 1, email: 'example@gmail.com', name: 'example' };

      const result = await service.findUnique(1);
      console.log(`findUnique::result`, result);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findMany', () => {
    it('should return list of all User', async () => {
      // add one more user
      const userCreateDto: UserCreateDto = {
        email: `example@gmail.com`,
        name: `example`
      };
      await service.createUser(userCreateDto);

      const expectedResult = [
        { email: 'example@gmail.com', id: 1, name: 'example' },
        { email: 'example@gmail.com', id: 2, name: 'example' }
      ];

      const result = await service.findMany({});
      console.log(`findUnique::result`, result);

      expect(result).toEqual(expectedResult);
    });
  });
});
