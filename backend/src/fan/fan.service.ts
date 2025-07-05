import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fan } from './fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';

@Injectable()
export class FanService {
  constructor(
    @InjectRepository(Fan) private fanRepo: Repository<Fan>,
    @InjectRepository(Celebrity) private celebRepo: Repository<Celebrity>,
  ) {}

  async register(data: Partial<Fan>) {
    return this.fanRepo.save(data);
  }

  async follow(fanId: number, celebId: number) {
    const fan = await this.fanRepo.findOne({
      where: { id: fanId },
      relations: ['following'],
    });
    const celeb = await this.celebRepo.findOneBy({ id: celebId });
    if (fan && celeb) {
      fan.following.push(celeb);
      return this.fanRepo.save(fan);
    }
  }

  async findAll() {
    return this.fanRepo.find({ relations: ['following'] });
  }

  async getDashboard(fanId: number) {
    const fan = await this.fanRepo.findOne({
      where: { id: fanId },
      relations: ['following'],
    });

    if (!fan) {
      throw new NotFoundException('Fan not found');
    }

    const allCelebs = await this.celebRepo.find();
    const followedIds = fan.following.map((celeb) => celeb.id);

    return {
      allCelebrities: allCelebs,
      followedCelebrityIds: followedIds,
    };
  }
}
