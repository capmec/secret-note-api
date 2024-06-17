import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';
import { SecretNote } from '.prisma/client';

@Injectable()
export class SecretNoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(note: string): Promise<SecretNote> {
    const encryptedNote = this.encryptionService.encrypt(note);
    return this.prisma.secretNote.create({
      data: { note: encryptedNote },
    });
  }

  async findAll(): Promise<Partial<SecretNote>[]> {
    const notes = await this.prisma.secretNote.findMany();
    return notes.map((note) => ({ id: note.id, createdAt: note.createdAt }));
  }

  async findOne(id: number, decrypted: boolean): Promise<string> {
    const note = await this.prisma.secretNote.findUnique({ where: { id } });
    if (decrypted) {
      return this.encryptionService.decrypt(note.note);
    }
    return note.note;
  }

  async update(id: number, newNote: string): Promise<SecretNote> {
    const encryptedNote = this.encryptionService.encrypt(newNote);
    return this.prisma.secretNote.update({
      where: { id },
      data: { note: encryptedNote },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.secretNote.delete({ where: { id } });
  }
}
