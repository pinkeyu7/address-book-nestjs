import { Test, TestingModule } from '@nestjs/testing';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './contact.dto';

describe('ContactService', () => {
  let contactService: ContactService;
  let contactRepository: Repository<Contact>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact),
          useClass: Repository,
        },
      ],
    }).compile();

    contactService = app.get<ContactService>(ContactService);
    contactRepository = app.get<Repository<Contact>>(
      getRepositoryToken(Contact),
    );
  });

  it('contactService should be defined', () => {
    expect(contactService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new contact', async () => {
      // Setup
      const date: Date = new Date();
      const contact: Contact = {
        id: 1,
        name: 'Pinke_create_name',
        phone: '0905-000-888',
        createdAt: date,
        updatedAt: date,
      };
      const request: CreateContactDto = {
        name: 'Pinke_create_name',
        phone: '0905-000-888',
      };
      jest.spyOn(contactRepository, 'save').mockResolvedValueOnce(contact);

      // Act
      const result = await contactService.create(request);

      // Assert
      expect(result.name).toEqual(contact.name);
      expect(result.phone).toEqual(contact.phone);
    });
  });

  describe('find', () => {
    it('should return an array of contacts', async () => {
      // Setup
      const date: Date = new Date();
      const contacts: Contact[] = [
        {
          id: 1,
          name: 'Pinke',
          phone: '0905-000-001',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          name: 'Andy',
          phone: '0905-000-002',
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 3,
          name: 'Eric',
          phone: '0905-000-003',
          createdAt: date,
          updatedAt: date,
        },
      ];
      jest.spyOn(contactRepository, 'find').mockResolvedValueOnce(contacts);

      // Act
      const result = await contactService.find(1, 10);

      // Assert
      expect(result).toEqual(contacts);
    });
  });

  describe('findOne', () => {
    it('should return a contact', async () => {
      // Setup
      const date: Date = new Date();
      const contact: Contact = {
        id: 1,
        name: 'Pinke',
        phone: '0905-000-001',
        createdAt: date,
        updatedAt: date,
      };
      jest.spyOn(contactRepository, 'findOne').mockResolvedValueOnce(contact);

      // Act
      const result = await contactService.findOne(1);

      // Assert
      expect(result).toEqual(contact);
    });
  });

  describe('update', () => {
    it('should update a exist contact', async () => {
      // Setup
      const date: Date = new Date();
      const contact: Contact = {
        id: 1,
        name: 'Pinke_update_name',
        phone: '0905-000-888',
        createdAt: date,
        updatedAt: date,
      };
      const request: UpdateContactDto = {
        name: 'Pinke_update_name',
        phone: '0905-000-888',
      };
      jest.spyOn(contactRepository, 'findOne').mockResolvedValueOnce(contact);
      jest.spyOn(contactRepository, 'save').mockResolvedValueOnce(contact);

      // Act
      const result = await contactService.update(1, request);

      // Assert
      expect(result.name).toEqual(contact.name);
      expect(result.phone).toEqual(contact.phone);
    });
  });

  describe('delete', () => {
    it('should delete a exist contact', async () => {
      // Setup
      const date: Date = new Date();
      const contact: Contact = {
        id: 1,
        name: 'Pinke_delete_name',
        phone: '0905-000-888',
        createdAt: date,
        updatedAt: date,
      };
      jest.spyOn(contactRepository, 'findOne').mockResolvedValueOnce(contact);
      jest.spyOn(contactRepository, 'remove').mockResolvedValueOnce(contact);

      // Act
      const result = await contactService.delete(1);

      // Assert
      expect(result).toEqual('delete contact by id: 1');
    });
  });
});
