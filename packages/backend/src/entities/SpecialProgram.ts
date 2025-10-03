import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('special_programs')
export class SpecialProgram {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  subtitle?: string;

  @Column('text')
  description!: string;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'int' })
  capacity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyTuition!: number;

  @Column({ type: 'int' })
  minAge!: number;

  @Column({ type: 'int' })
  maxAge!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ type: 'json', nullable: true })
  tags?: string[]; // e.g., ["Education", "Youth", "Vocal Training", "Community"]

  @Column({ type: 'json', nullable: true })
  galleryImages?: string[]; // Array of image URLs

  @Column({ type: 'json', nullable: true })
  instructors?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    qualifications: string;
    experience: string;
    image: string;
  }>;

  @Column({ type: 'json', nullable: true })
  curriculum?: Array<{
    phase: string;
    duration: string;
    description: string;
    skills: string[];
  }>;

  @Column({ type: 'json', nullable: true })
  whatsIncluded?: string[]; // e.g., ["Weekly group classes", "Individual voice coaching", "Music theory instruction"]

  @Column({ type: 'json', nullable: true })
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
  }>;

  // Program director/organizer
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'directorId' })
  director?: User;

  @Column({ nullable: true })
  directorId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}