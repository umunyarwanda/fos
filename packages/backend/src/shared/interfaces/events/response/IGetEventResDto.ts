import { EVenueType } from "@/shared/enum/EVenueType.enum";

export interface IGetEventResDto {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  location: string;
  address?: string;
  capacity?: number;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
  galleryImages?: string[];
  featuredPerformers?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    image: string;
  }>;
  venueType: EVenueType;
  organizerId?: number;
  createdAt: string;
  updatedAt: string;
}