import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './../../src/users/schemas/user.schema';
import { UsersModule } from './../../src/users/users.module';
import { UsersController } from './../../src/users/users.controller';
import { UsersService } from './../../src/users/users.service';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  const userExample = {
    name: 'exampleadp',
    email: 'example@gmail.com',
    password: 'example123',
  };

  describe('findAllUsers', () => {
    it('must return an object with users array and pagination', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() =>
        Promise.resolve({
          data: [userExample],
          pagination: { currentPage: 1, totalPages: 1, totalItems: 1 },
        } as unknown as Promise<any>),
      );
      const result = await controller.findAll({});
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(expect.objectContaining(userExample));
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
