import { Module } from '@nestjs/common';
import { SecretNoteModule } from './secrete-note/secret-note.module';

@Module({
  imports: [SecretNoteModule],
})
export class AppModule {}
