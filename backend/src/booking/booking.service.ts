import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async create(data: Partial<Booking>) {
    return this.bookingRepo.save(data);
  }

  async findAll() {
    return this.bookingRepo.find();
  }
}
