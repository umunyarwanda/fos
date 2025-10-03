export declare class EventResponseDto {
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
    venueType: 'indoor' | 'outdoor';
    organizerId?: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=event-response.dto.d.ts.map