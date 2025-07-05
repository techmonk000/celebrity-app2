// backend/src/fan/fan.module.ts
import { Module } from '@nestjs/common';
import { FanService } from './fan.service';
import { FanController } from './fan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from './fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fan, Celebrity])],
  controllers: [FanController],
  providers: [FanService],
})
export class FanModule {}
