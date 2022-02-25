import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userRepository = app.get<Repository<User>>(getRepositoryToken(User));
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
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
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      // Act
      const result = await userService.findOne(1);

      // Assert
      expect(result).toEqual(user);
    });
  });

  describe('findOneByAccount', () => {
    it('should return a user search by account', async () => {
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
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      // Act
      const result = await userService.findOneByAccount('pinke');

      // Assert
      expect(result).toEqual(user);
    });
  });
});
