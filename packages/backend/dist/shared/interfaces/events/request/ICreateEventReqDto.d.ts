import { EVenueType } from "@/shared/enum/EVenueType.enum";
export interface ICreateEventReqDto {
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
    featuredPerformers?: Array<{
        name: string;
        title: string;
        subtitle: string;
        role: string;
        image: string;
    }>;
    venueType: EVenueType;
}
//# sourceMappingURL=ICreateEventReqDto.d.ts.map