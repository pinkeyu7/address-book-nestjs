import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './contact.dto';
import { JwtAuthGuard } from '../user/jwt.guard';

import {
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body parameter error.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    if (createContactDto.name === '' || createContactDto.phone === '') {
      throw new HttpException('body parameter error.', HttpStatus.BAD_REQUEST);
    }

    return await this.contactService.create(createContactDto);
  }

  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'perPage', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'query parameter error.',
  })
  @Get()
  async list(@Query() query) {
    const page = parseInt(query.page, 10);
    const perPage = parseInt(query.perPage, 10);
    if (isNaN(page) || isNaN(perPage)) {
      throw new HttpException('query parameter error.', HttpStatus.BAD_REQUEST);
    }

    // TODO - get total amount
    // TODO - calculate next page
    const data = await this.contactService.find(page, perPage);

    const response = {
      page: page,
      perPage: perPage,
      total: 0,
      nextPage: 0,
      data: data,
    };

    return response;
  }

  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'contact id type error.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'contact not found.',
  })
  @Get(':id')
  async get(@Param() param): Promise<Contact> {
    const id = parseInt(param.id, 10);
    if (isNaN(id)) {
      throw new HttpException('contact id type error.', HttpStatus.BAD_REQUEST);
    }

    const data = await this.contactService.findOne(id);
    if (data == undefined) {
      throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'body parameter error.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param() param, @Body() updateContactDto: UpdateContactDto) {
    const id = parseInt(param.id, 10);
    if (isNaN(id)) {
      throw new HttpException('contact id type error.', HttpStatus.BAD_REQUEST);
    }

    const contact = await this.contactService.findOne(id);
    if (contact == undefined) {
      throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
    }

    return this.contactService.update(id, updateContactDto);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() param) {
    const id = parseInt(param.id, 10);
    if (isNaN(id)) {
      throw new HttpException('contact id type error.', HttpStatus.BAD_REQUEST);
    }

    const contact = await this.contactService.findOne(id);
    if (contact == undefined) {
      throw new HttpException('contact not found.', HttpStatus.BAD_REQUEST);
    }

    await this.contactService.delete(id);

    return '{}';
  }
}
