import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Event } from './Event';
import { ERecurrencePattern } from '../shared/enum/ERecurrencePattern.enum';
import { EEventType } from '../shared/enum/EEventType.enum';
import { EScheduleStatus } from '../shared/enum/EScheduleStatus.enum';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'date' })
  scheduleDate!: Date;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ 
    type: 'enum', 
    enum: EEventType,
    default: EEventType.REHEARSAL
  })
  eventType!: EEventType;

  @Column({ 
    type: 'enum', 
    enum: EScheduleStatus,
    default: EScheduleStatus.TENTATIVE
  })
  status!: EScheduleStatus;

  @Column({ default: true })
  isRecurring!: boolean;

  @Column({ 
    type: 'enum', 
    enum: ERecurrencePattern,
    nullable: true
  })
  recurrencePattern?: ERecurrencePattern;

  @Column({ type: 'int', nullable: true })
  recurrenceInterval?: number; // e.g., every 2 weeks

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}