/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Book } from './interfaces/books.interface';
import { CreateBookDto } from './dtos/create-books.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { DatabaseService } from 'src/database/connection.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const result = await this.databaseService.query(
        'SELECT * FROM sp_create_book($1, $2, $3, $4)',
        [
          createBookDto.title,
          createBookDto.author,
          createBookDto.publication_year,
          createBookDto.isbn,
        ],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException('Book not found');
      }
      return result.rows[0];
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(
          `Book with ISBN ${createBookDto.isbn} already exists`,
        );
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  async findAllBooks(): Promise<Book[]> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_get_books()`,
      );
      if (result.rows.length === 0) {
        throw new NotFoundException('No books found');
      }
      return result.rows;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to retrieve books');
    }
  }
  async findByauthor(author: string): Promise<Book[]> {
    const query = `SELECT * FROM sp_get_books_by_author($1)`;
    const result = await this.databaseService.query(query, [author]);
    return result.rows;
  }

  async findBytitle(title: string): Promise<Book[]> {
    const query = `SELECT * FROM sp_get_books_by_title($1)`;
    const result = await this.databaseService.query(query, [title]);
    return result.rows;
  }

  async findByisbn(isbn: string): Promise<Book[]> {
    const query = `SELECT * FROM sp_get_books_by_isbn($1)`;
    const result = await this.databaseService.query(query, [isbn]);
    return result.rows;
  }

  async deleteBook(id: number): Promise<Book> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_delete_book($1)`,
        [id],
      );
    
      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to delete book ${id}`);
    }
  }

  async findOneBook(id: number): Promise<Book> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_get_books($1)`,
        [id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to retrieve book ${id}`);
    }
  }


  async updateBook(id: number, data: UpdateBookDto): Promise<Book> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_update_book($1, $2, $3, $4, $5)`,
        [id, data.title, data.author, data.publication_year, data.isbn],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to update book ${id}`);
    }
  }
}
