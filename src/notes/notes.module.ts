import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DatabaseService } from '../database/connection.service';

@Module({
  providers: [NotesService, DatabaseService],
  controllers: [NotesController],
})
export class NotesModule {} 