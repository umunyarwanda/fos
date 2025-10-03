import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum ContactSubject {
  GENERAL_INQUIRY = 'general_inquiry',
  EVENT_BOOKING = 'event_booking',
  COMMISSION_REQUEST = 'commission_request',
  SUPPORT = 'support',
  FEEDBACK = 'feedback',
  OTHER = 'other',
}

export enum ContactStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  RESPONDED = 'responded',
  CLOSED = 'closed',
}

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column()
  subject!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ 
    type: 'enum', 
    enum: ContactStatus,
    default: ContactStatus.NEW 
  })
  status!: ContactStatus;

  @Column({ type: 'text', nullable: true })
  adminNotes?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}