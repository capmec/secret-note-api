import { Module } from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { SecretNoteController } from './secret-note.controller';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../encryption.service';

@Module({
  providers: [SecretNoteService, PrismaService, EncryptionService],
  controllers: [SecretNoteController],
})
export class SecretNoteModule {}
