import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { LoginUserDto } from './user.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body parameter error.',
  })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    if (loginUserDto.account === '' || loginUserDto.password === '') {
      throw new HttpException('body parameter error.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findOneByAccount(loginUserDto.account);
    if (user == undefined) {
      throw new HttpException('password incorrect.', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(loginUserDto.password, saltOrRounds);
    const isMatch = await bcrypt.compare(user.password, hash);
    if (isMatch === false) {
      throw new HttpException('password incorrect.', HttpStatus.BAD_REQUEST);
    }

    const accessToken = this.jwtService.sign({
      account_id: user.id,
      account: user.account,
    });

    const response = {
      token: accessToken,
      name: user.name,
      email: user.email,
    };

    return response;
  }
}
