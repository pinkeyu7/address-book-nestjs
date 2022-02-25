import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOneByAccount(account: string): Promise<User> {
    const user = new User();
    user.account = account;

    return this.userRepository.findOne(user);
  }
}
