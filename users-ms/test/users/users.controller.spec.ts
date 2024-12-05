import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../src/users/schemas/user.schema';
import { UsersModule } from '../../src/users/users.module';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { Types } from 'mongoose';

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
    _id: new Types.ObjectId(),
    name: 'example',
    email: 'example@gmail.com',
    password: 'example123',
  };

  const documentExample = {
    ...userExample,
    __v: 0,
    toJSON: jest.fn().mockReturnValue(userExample),
  };

  const mockUserModel = {
    create: jest.fn().mockReturnValue(documentExample),
  };

  describe('findAllUsers', () => {
    it('must return an object with users array and pagination', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue({
        data: [await mockUserModel.create()],
        pagination: { page: 1, limit: 1, totalPage: 1 },
      });
      const result = await controller.findAll({});
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(expect.objectContaining(documentExample));
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
