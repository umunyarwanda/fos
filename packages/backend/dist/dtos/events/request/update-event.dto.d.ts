declare class FeaturedPerformerDto {
    name?: string;
    title?: string;
    subtitle?: string;
    role?: string;
    image?: string;
}
export declare class UpdateEventDto {
    title?: string;
    subtitle?: string;
    description?: string;
    eventDate?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    address?: string;
    capacity?: number;
    isActive?: boolean;
    isFeatured?: boolean;
    tags?: string[];
    galleryImages?: string[];
    featuredPerformers?: FeaturedPerformerDto[];
    venueType?: 'indoor' | 'outdoor';
}
export {};
//# sourceMappingURL=update-event.dto.d.ts.map