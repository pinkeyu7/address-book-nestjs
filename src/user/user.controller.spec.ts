import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt.token'),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('userController should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      // Setup
      const date: Date = new Date();
      const user: User = {
        id: 1,
        account: 'pinke',
        password: '12345678',
        name: 'Pinke',
        email: 'pinke.yu@ailabs.tw',
        createdAt: date,
        updatedAt: date,
      };
      const request: LoginUserDto = {
        account: 'pinke',
        password: '12345678',
      };
      jest.spyOn(userService, 'findOneByAccount').mockResolvedValueOnce(user);

      // Act
      const result = await userController.login(request);

      // Assert
      expect(result.token).toEqual('jwt.token');
      expect(result.name).toEqual(user.name);
      expect(result.email).toEqual(user.email);
    });
  });
});
