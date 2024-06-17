import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';

@Controller('secret-notes')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @Post()
  create(@Body('note') note: string) {
    return this.secretNoteService.create(note);
  }

  @Get()
  findAll() {
    return this.secretNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query('decrypted') decrypted: string) {
    const isDecrypted = decrypted === 'true';
    return this.secretNoteService.findOne(id, isDecrypted);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('note') note: string) {
    return this.secretNoteService.update(id, note);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.secretNoteService.remove(id);
  }
}
