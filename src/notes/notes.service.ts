import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/connection.service';
import { Note } from './interfaces/notes.interface';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM sp_create_note($1)',
        [createNoteDto.text],
      );
      return result.rows[0];
    } catch (error) {
      console.error('Create note error:', error);
      throw new InternalServerErrorException('Failed to create note');
    }
  }

  async findAll(): Promise<Note[]> {
    try {
      const result = await this.databaseService.query('SELECT * FROM sp_get_notes()');
      return result.rows;
    } catch (error) {
      console.error('Get notes error:', error);
      throw new InternalServerErrorException('Failed to get notes');
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM sp_update_note($1, $2)',
        [id, updateNoteDto.text],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Update note error:', error);
      throw new InternalServerErrorException('Failed to update note');
    }
  }

  async delete(id: number): Promise<Note> {
    console.log('Attempting to delete note with id:', id);
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM sp_delete_note($1)',
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Delete note error:', error);
      throw new InternalServerErrorException('Failed to delete note');
    }
  }
} 