import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Booking } from './Booking';

export enum CommissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum CommissionType {
  PERFORMANCE = 'performance',
  RECORDING = 'recording',
  WORKSHOP = 'workshop',
  CONSULTATION = 'consultation',
  OTHER = 'other',
}

@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ nullable: true })
  duration?: string;

  @Column({ type: 'json', nullable: true })
  inclusions?: string[];

  @OneToMany(() => Booking, (booking) => booking.commission)
  bookings?: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}