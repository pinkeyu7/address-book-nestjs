import { Test, TestingModule } from '@nestjs/testing';
import { Contact } from './contact.entity';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './contact.dto';

describe('ContactController', () => {
  let contactController: ContactController;
  let contactService: ContactService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact),
          useClass: Repository,
        },
      ],
    }).compile();

    contactController = app.get<ContactController>(ContactController);
    contactService = app.get<ContactService>(ContactService);
  });

  it('contactController should be defined', () => {
    expect(contactController).toBeDefined();
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
      jest.spyOn(contactService, 'create').mockResolvedValueOnce(contact);

      // Act
      const result = await contactController.create(request);

      // Assert
      expect(result.name).toEqual(contact.name);
      expect(result.phone).toEqual(contact.phone);
    });
  });

  describe('list', () => {
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
      const query = {
        page: 1,
        perPage: 10,
      };

      jest.spyOn(contactService, 'find').mockResolvedValueOnce(contacts);

      // Act
      const result = await contactController.list(query);

      // Assert
      expect(result.data).toEqual(contacts);
      expect(result.page).toEqual(query.page);
      expect(result.perPage).toEqual(query.perPage);
    });
  });

  describe('get', () => {
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
      const param = {
        id: 1,
      };
      jest.spyOn(contactService, 'findOne').mockResolvedValueOnce(contact);

      // Act
      const result = await contactController.get(param);

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
      const param = {
        id: 1,
      };
      jest.spyOn(contactService, 'findOne').mockResolvedValueOnce(contact);
      jest.spyOn(contactService, 'update').mockResolvedValueOnce(contact);

      // Act
      const result = await contactController.update(param, request);

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
      const param = {
        id: 1,
      };
      jest.spyOn(contactService, 'findOne').mockResolvedValueOnce(contact);
      jest.spyOn(contactService, 'delete').mockResolvedValueOnce('');

      // Act
      const result = await contactController.delete(param);

      // Assert
      expect(result).toEqual('{}');
    });
  });
});
