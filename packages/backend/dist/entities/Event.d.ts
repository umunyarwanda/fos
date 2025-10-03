import { User } from './User';
import { EVenueType } from '@/shared/enum/EVenueType.enum';
export declare class Event {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    eventDate: Date;
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
    organizer?: User;
    organizerId?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Event.d.ts.map