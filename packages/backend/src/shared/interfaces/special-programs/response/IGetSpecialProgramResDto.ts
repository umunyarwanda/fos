export interface IGetSpecialProgramResDto {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  location: string;
  address?: string;
  capacity: number;
  monthlyTuition: number;
  minAge: number;
  maxAge: number;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
  galleryImages?: string[];
  instructors?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    qualifications: string;
    experience: string;
    image: string;
  }>;
  curriculum?: Array<{
    phase: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  whatsIncluded?: string[];
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
  }>;
  directorId?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}