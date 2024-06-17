import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';
import { SecretNote } from '@prisma/client';

@Injectable()
export class SecretNoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(note: string): Promise<SecretNote> {
    const encryptedNote = this.encryptionService.encrypt(note);
    return this.prisma.secretNote.create({
      data: {
        note: encryptedNote,
      },
    });
  }

  async findAll(): Promise<{ id: number; createdAt: Date }[]> {
    const notes = await this.prisma.secretNote.findMany({
      select: {
        id: true,
        note: true,
        createdAt: true,
      },
    });
    return notes;
  }

  async findOne(id: number, decrypt = false): Promise<string> {
    const note = await this.prisma.secretNote.findUnique({
      where: { id },
    });

    if (!note) {
      throw new Error('Note not found');
    }

    return decrypt ? this.encryptionService.decrypt(note.note) : note.note;
  }

  async update(id: number, newNote: string): Promise<SecretNote> {
    const encryptedNote = this.encryptionService.encrypt(newNote);
    return this.prisma.secretNote.update({
      where: { id },
      data: { note: encryptedNote },
    });
  }

  async remove(id: number): Promise<SecretNote> {
    return this.prisma.secretNote.delete({
      where: { id },
    });
  }
}
