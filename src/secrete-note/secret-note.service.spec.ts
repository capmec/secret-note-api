import { Test, TestingModule } from '@nestjs/testing';
import { SecretNoteService } from './secret-note.service';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';

describe('SecretNoteService', () => {
  let service: SecretNoteService;
  let prisma: PrismaService;
  let encryptionService: EncryptionService;

  const mockPrisma = {
    secretNote: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        note: 'encryptedNote',
        createdAt: new Date(),
      }),
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: 1, note: 'encryptedNote', createdAt: new Date() },
        ]),
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        note: 'encryptedNote',
        createdAt: new Date(),
      }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        note: 'encryptedNote',
        createdAt: new Date(),
      }),
      delete: jest.fn().mockResolvedValue({}),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretNoteService,
        EncryptionService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SecretNoteService>(SecretNoteService);
    prisma = module.get<PrismaService>(PrismaService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a secret note', async () => {
    jest.spyOn(encryptionService, 'encrypt').mockReturnValue('encryptedNote');
    const note = await service.create('testNote');
    expect(note).toEqual({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    });
    expect(prisma.secretNote.create).toHaveBeenCalled();
  });

  it('should find all secret notes', async () => {
    const notes = await service.findAll();
    expect(notes).toEqual([{ id: 1, createdAt: new Date() }]);
    expect(prisma.secretNote.findMany).toHaveBeenCalled();
  });

  it('should find one secret note decrypted', async () => {
    jest.spyOn(encryptionService, 'decrypt').mockReturnValue('testNote');
    const note = await service.findOne(1, true);
    expect(note).toEqual('testNote');
    expect(prisma.secretNote.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should find one secret note encrypted', async () => {
    const note = await service.findOne(1, false);
    expect(note).toEqual('encryptedNote');
    expect(prisma.secretNote.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a secret note', async () => {
    jest.spyOn(encryptionService, 'encrypt').mockReturnValue('encryptedNote');
    const note = await service.update(1, 'updatedNote');
    expect(note).toEqual({
      id: 1,
      note: 'encryptedNote',
      createdAt: new Date(),
    });
    expect(prisma.secretNote.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { note: 'encryptedNote' },
    });
  });

  it('should remove a secret note', async () => {
    await service.remove(1);
    expect(prisma.secretNote.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
