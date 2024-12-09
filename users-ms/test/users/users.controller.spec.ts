import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../src/users/schemas/user.schema';
import { UsersModule } from '../../src/users/users.module';
import { UsersController } from '../../src/users/users.controller';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from 'src/users/dto/users.dto';

describe('UserController', () => {
  let controller: UsersController;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    userModel = {
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(userModel)
      .compile();

    controller = module.get<UsersController>(UsersController);
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

  describe('findOneUser', () => {
    it('must return an object with user data', async () => {
      jest
        .spyOn(userModel, 'findById')
        .mockResolvedValue(await mockUserModel.create());
      const result = await controller.findOne(userExample._id.toString());
      expect(result).toEqual(expect.objectContaining(documentExample));
      expect(userModel.findById).toHaveBeenCalledWith(
        userExample._id.toString(),
      );
      expect(userModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  const updateUser: UpdateUserDto = {
    user_ID: userExample._id.toString(),
    name: userExample.name,
    email: userExample.email,
  };

  describe('updateUser', () => {
    it('must return an object with user data updated', async () => {
      jest
        .spyOn(userModel, 'findByIdAndUpdate')
        .mockResolvedValue(await mockUserModel.create());
      const result = await controller.update(updateUser);
      expect(result).toEqual(expect.objectContaining(documentExample));
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        updateUser.user_ID,
        updateUser,
        { new: true },
      );
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
});
