import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';
import { SecretNote } from '@prisma/client';

@Injectable()
export class SecretNoteService {
  private readonly logger = new Logger(SecretNoteService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(note: string): Promise<SecretNote> {
    this.logger.log('Creating note...');
    const encryptedNote = this.encryptionService.encrypt(note);
    return this.prisma.secretNote.create({
      data: {
        note: encryptedNote,
      },
    });
  }

  async findAll(): Promise<{ id: number; createdAt: Date }[]> {
    this.logger.log('Fetching all notes...');
    const notes = await this.prisma.secretNote.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    });
    return notes;
  }

  async findOne(id: number, decrypt = false): Promise<string> {
    this.logger.log(`Fetching note with id ${id}...`);
    const note = await this.prisma.secretNote.findUnique({
      where: { id },
    });

    if (!note) {
      throw new Error('Note not found');
    }

    const result = decrypt
      ? this.encryptionService.decrypt(note.note)
      : note.note;
    this.logger.log(`Note content: ${result}`);
    return result;
  }

  async update(id: number, newNote: string): Promise<SecretNote> {
    this.logger.log(`Updating note with id ${id}...`);
    const encryptedNote = this.encryptionService.encrypt(newNote);
    return this.prisma.secretNote.update({
      where: { id },
      data: { note: encryptedNote },
    });
  }

  async remove(id: number): Promise<SecretNote> {
    this.logger.log(`Deleting note with id ${id}...`);
    return this.prisma.secretNote.delete({
      where: { id },
    });
  }
}
