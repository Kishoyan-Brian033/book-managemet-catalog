import { Module } from '@nestjs/common';
import { DatabaseService } from './connection.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
