import { Module } from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { CelebrityController } from './celebrity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celebrity } from './celebrity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity])],
  controllers: [CelebrityController],
  providers: [CelebrityService],
})
export class CelebrityModule {}
