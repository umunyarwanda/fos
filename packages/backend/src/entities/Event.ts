import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { EVenueType } from '../shared/enum/EVenueType.enum';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column('text')
  description!: string;

  @Column({ type: 'datetime' })
  eventDate!: Date;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'int', nullable: true })
  capacity?: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ type: 'json', nullable: true })
  tags?: string[]; // e.g., ["Christmas", "Gospel", "Family", "Community"]

  @Column({ type: 'json', nullable: true })
  galleryImages?: string[]; // Array of image URLs

  @Column({ type: 'json', nullable: true })
  featuredPerformers?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    image: string;
  }>;

  @Column({ type: 'enum', enum: EVenueType, default: EVenueType.INDOOR })
  venueType!: EVenueType;

  // Event organizer/creator
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'organizerId' })
  organizer?: User;

  @Column({ nullable: true })
  organizerId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}