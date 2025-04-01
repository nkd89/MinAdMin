import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(data: Partial<Document>): Promise<Document> {
    const doc = this.documentRepository.create(data);
    return this.documentRepository.save(doc);
  }

  findAll(): Promise<Document[]> {
    return this.documentRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Document | null> {
    return this.documentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  findByUser(user_id: number): Promise<Document[] | null> {
    return this.documentRepository.find({
      where: { user_id: user_id },
    });
  }

  async update(id: number, data: Partial<Document>): Promise<Document | null> {
    await this.documentRepository.update(id, data);
    const document = await this.findOne(id);
    return document;
  }

  async remove(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
