import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from './celebrity.entity';
import { askGemini } from '../shared/gemini';

export interface CelebrityAIResponse {
  name: string;
  category: string;
  bio: string;
  location: string;
  image: string;
  socials: {
    instagram: string;
    twitter: string;
  };
}
type AIFillCelebrity = {
  name: string;
  category: string;
  location: string;
  bio: string;
  image: string;
};

@Injectable()
export class CelebrityService {
  constructor(
    @InjectRepository(Celebrity)
    private readonly celebrityRepo: Repository<Celebrity>,
  ) {}

  async findAll(): Promise<Celebrity[]> {
    return this.celebrityRepo.find();
  }

  async create(data: Partial<Celebrity>): Promise<Celebrity> {
    return this.celebrityRepo.save(data);
  }

  async search(query: string) {
    const text = await askGemini(`Give brief details about: ${query}`);
    return { generated: text };
  }
  async update(
    id: number,
    data: Partial<Celebrity>,
  ): Promise<Celebrity | null> {
    await this.celebrityRepo.update(id, data);
    return this.celebrityRepo.findOneBy({ id });
  }
  async aiFill(prompt: string) {
    const formatExample = `
Return JSON in this exact structure:

{
  "name": "Celebrity Name",
  "category": "Singer / Actor / Comedian / Dancer",
  "location": "City, Country",
  "bio": "Short bio of the celebrity (max 30 words)",
  "image": "URL to image (Wikipedia or official profile)"
}
`;

    const aiResponse = await askGemini(`Prompt: ${prompt}\n\n${formatExample}`);
    console.log('AI Raw Response:', aiResponse);

    try {
      const jsonStart = aiResponse.indexOf('{');
      const jsonEnd = aiResponse.lastIndexOf('}');
      const rawJson = aiResponse.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(rawJson) as AIFillCelebrity;
      return parsed;
    } catch (e) {
      console.error('Error parsing AI response:', e);
      return { error: 'Failed to parse AI output', raw: aiResponse };
    }
  }
}
