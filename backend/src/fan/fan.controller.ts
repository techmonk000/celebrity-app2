import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { FanService } from './fan.service';

@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @Post('register')
  register(@Body() body) {
    return this.fanService.register(body);
  }

  @Post('follow/:fanId/:celebId')
  follow(@Param('fanId') fanId: number, @Param('celebId') celebId: number) {
    return this.fanService.follow(fanId, celebId);
  }

  @Get('dashboard/:fanId')
  dashboard(@Param('fanId') fanId: number) {
    return this.fanService.getDashboard(fanId);
  }
  @Get()
  getAllFans() {
    return this.fanService.findAll();
  }
}
