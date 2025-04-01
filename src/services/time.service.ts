import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntity } from 'src/entities/time.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(TimeEntity)
    private readonly timeRepo: Repository<TimeEntity>,
  ) {}

  async getOffset(): Promise<number> {
    const record = await this.timeRepo.findOne({ where: { id: 1 } });
    let znak;
    if(record?.type){
        znak = 1;
    } else {
        znak = -1;
    }

    if (record?.offsetMinutes){
        const offset = record?.offsetMinutes * znak;
        return offset;
    } else {
        return 0;
    }
  }

  async setOffset(minutes: number, type: boolean): Promise<TimeEntity> {
    let record = await this.timeRepo.findOne({ where: { id: 1 } });
    if (!record) {
      record = this.timeRepo.create({ offsetMinutes: minutes, type: type });
    } else {
      record.offsetMinutes = minutes;
      record.type = type;
    }
    return this.timeRepo.save(record);
  }

  async getVirtualNow(): Promise<Date> {
    const now = new Date();
    const offset = await this.getOffset();
    return new Date(now.getTime() + offset * 60000 + 3 * 60 * 60 * 1000); // 60000 = миллисекунд в минуте
  }
}
