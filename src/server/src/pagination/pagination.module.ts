import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';

@Module({
  controllers: [PaginationController],
  providers: [PaginationService],
  exports:[PaginationService]
})
export class PaginationModule {}
