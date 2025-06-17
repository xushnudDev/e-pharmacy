import { Module } from '@nestjs/common';
import { PillClient } from './pill.client';
import { PillService } from './pill.service';
import { PillController } from './pill.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [PillController],
  providers: [PillClient, PillService],
})
export class PillModule {}
