import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Commission } from './Commission';
import { BookingStatus, Duration } from '../shared/enum/EBooking.enum';


@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  // Contact Information
  @Column({ type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 255 })
  eventLocation!: string;

  @Column({ type: 'datetime' })
  eventDate!: Date;

  @Column({ type: 'enum', enum: Duration, nullable: true })
  duration?: Duration;

  // Additional Information
  @Column({ type: 'text', nullable: true })
  additionalMessage?: string;

  // Commission Reference
  @ManyToOne(() => Commission, { nullable: true })
  @JoinColumn({ name: 'commissionId' })
  commission?: Commission;

  @Column({ type: 'int', nullable: true })
  commissionId?: number;

  // Custom Event Type (when user selects "other")
  @Column({ type: 'varchar', length: 255, nullable: true })
  customEventType?: string;

  // Status and Management
  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}