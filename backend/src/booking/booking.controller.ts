import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { generateBookingPDF } from './pdf_service';
import { Response } from 'express';
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() body) {
    return this.bookingService.create(body);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }
  @Post('download')
  downloadPDF(@Res() res: Response, @Body() body) {
    generateBookingPDF(body, res);
  }
}
