import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { Patch, Param } from '@nestjs/common';

@Controller('celebrity')
export class CelebrityController {
  constructor(private readonly celebrityService: CelebrityService) {}

  @Patch(':id')
  updateCelebrity(@Param('id') id: number, @Body() body: Partial<any>) {
    return this.celebrityService.update(+id, body);
  }

  @Get()
  getAll() {
    return this.celebrityService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.celebrityService.create(body);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.celebrityService.search(query);
  }
  @Post('ai-fill')
  async aiFill(@Body('prompt') prompt: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await this.celebrityService.aiFill(prompt);
  }
}
