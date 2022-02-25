import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({
    description: 'Account',
    type: 'string',
  })
  account: string;

  @ApiProperty({
    description: 'Password',
    type: 'string',
  })
  password: string;
}
