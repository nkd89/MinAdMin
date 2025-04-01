
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'time_settings' })
export class TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  offsetMinutes: number;

  @Column({ type: 'boolean', default: 0 })
  type: boolean;
}
