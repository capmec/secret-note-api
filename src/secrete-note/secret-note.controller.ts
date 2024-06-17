import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.secretNoteService.create(createNoteDto.note);
  }

  @Get()
  findAll() {
    return this.secretNoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query('decrypted') decrypted: string) {
    const decrypt = decrypted === 'true';
    return this.secretNoteService.findOne(+id, decrypt);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.secretNoteService.update(+id, updateNoteDto.note);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.secretNoteService.remove(+id);
  }
}
