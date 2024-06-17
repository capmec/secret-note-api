import { Test, TestingModule } from '@nestjs/testing';
import { SecretNoteController } from './secret-note.controller';
import { SecretNoteService } from './secret-note.service';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';

describe('SecretNoteController', () => {
  let controller: SecretNoteController;
  let service: SecretNoteService;

  const mockService = {
    create: jest.fn().mockResolvedValue({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, createdAt: new Date() }]),
    findOne: jest.fn().mockResolvedValue('decryptedNote'),
    update: jest.fn().mockResolvedValue({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    }),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNoteController],
      providers: [
        { provide: SecretNoteService, useValue: mockService },
        PrismaService,
        EncryptionService,
      ],
    }).compile();

    controller = module.get<SecretNoteController>(SecretNoteController);
    service = module.get<SecretNoteService>(SecretNoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a secret note', async () => {
    const note = await controller.create({ note: 'testNote' });
    expect(note).toEqual({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    });
    expect(service.create).toHaveBeenCalledWith('testNote');
  });

  it('should find all secret notes', async () => {
    const notes = await controller.findAll();
    expect(notes).toEqual([{ id: 1, createdAt: new Date() }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one secret note decrypted', async () => {
    const note = await controller.findOne(1, 'true');
    expect(note).toEqual('decryptedNote');
    expect(service.findOne).toHaveBeenCalledWith(1, true);
  });

  it('should find one secret note encrypted', async () => {
    const note = await controller.findOne(1, 'false');
    expect(note).toEqual('decryptedNote');
    expect(service.findOne).toHaveBeenCalledWith(1, false);
  });

  it('should update a secret note', async () => {
    const note = await controller.update(1, { note: 'updatedNote' });
    expect(note).toEqual({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    });
    expect(service.update).toHaveBeenCalledWith(1, 'updatedNote');
  });

  it('should remove a secret note', async () => {
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
