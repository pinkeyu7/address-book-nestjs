import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Phone',
    type: 'string',
  })
  phone: string;
}

export class UpdateContactDto {
  @ApiProperty({
    description: 'Name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Phone',
    type: 'string',
  })
  phone: string;
}
