/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database/connection.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, email, password } = createUserDto;
      const createdAt = createUserDto.createdAt || new Date();
      const updatedAt = createUserDto.updatedAt || new Date();
      const query = `SELECT * FROM sp_create_user($1, $2, $3, $4, $5);`;
      const values = [name, email, password, createdAt, updatedAt];
      const result = await this.databaseService.query(query, values);
      if (result.rows.length === 0) {
        throw new NotFoundException('User not created');
      }
      return result.rows[0];
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(
          `User with email ${createUserDto.email} already exists`,
        );
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = `SELECT * FROM sp_get_user_by_email($1);`;
      const result = await this.databaseService.query(query, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to retrieve user by email ${email}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const query = `SELECT * FROM sp_get_user($1);`;
      const result = await this.databaseService.query(query, [id]);
      if (result.rows.length === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to retrieve user ${id}`);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
      const { name, email, password, createdAt, updatedAt } = updateUserDto;
      const query = `SELECT * FROM sp_update_user($1, $2, $3, $4, $5, $6);`;
      const values = [
        id,
        name || null,
        email || null,
        password || null,
        createdAt || null,
        updatedAt || null,
      ];
      const result = await this.databaseService.query(query, values);
      if (result.rows.length === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to update user ${id}`);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const query = `SELECT sp_delete_user($1);`;
      const result = await this.databaseService.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException(`Failed to delete user ${id}`);
    }
  }
}
