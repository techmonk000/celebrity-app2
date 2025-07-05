import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/postgres.config';
import { ConfigModule } from '@nestjs/config';
import { CelebrityModule } from './celebrity/celebrity.module';
import { FanModule } from './fan/fan.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CelebrityModule,
    FanModule,
    BookingModule,
  ],
})
export class AppModule {}
