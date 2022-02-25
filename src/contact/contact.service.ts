import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    contact.name = createContactDto.name;
    contact.phone = createContactDto.phone;
    await this.contactRepository.save(contact);

    return contact;
  }

  async find(page: number, perPage: number): Promise<Contact[]> {
    const offset = (page - 1) * perPage;

    return this.contactRepository.find({
      select: ['id', 'name', 'phone'],
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: perPage,
    });
  }

  async findOne(id: number): Promise<Contact> {
    return this.contactRepository.findOne(id);
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contactUpdate = await this.contactRepository.findOne(id);
    contactUpdate.name = updateContactDto.name;
    contactUpdate.phone = updateContactDto.phone;
    await this.contactRepository.save(contactUpdate);

    return contactUpdate;
  }

  async delete(id: number) {
    const contactDelete = await this.contactRepository.findOne(id);
    await this.contactRepository.remove(contactDelete);

    return 'delete contact by id: ' + id;
  }
}
