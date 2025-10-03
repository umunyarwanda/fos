import { ICreateEventReqDto } from '@/shared/interfaces/events/request/ICreateEventReqDto';
import { EVenueType } from '../../../shared/enum/EVenueType.enum';
declare class FeaturedPerformerDto {
    name: string;
    title: string;
    subtitle: string;
    role: string;
    image: string;
}
export declare class CreateEventDto implements ICreateEventReqDto {
    title: string;
    subtitle?: string;
    description: string;
    eventDate: string;
    startTime: string;
    endTime?: string;
    location: string;
    address?: string;
    capacity?: number;
    isFeatured?: boolean;
    tags?: string[];
    galleryImages?: string[];
    featuredPerformers?: FeaturedPerformerDto[];
    venueType: EVenueType;
}
export {};
//# sourceMappingURL=create-event.dto.d.ts.map