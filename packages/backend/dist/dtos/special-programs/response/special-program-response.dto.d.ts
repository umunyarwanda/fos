export declare class SpecialProgramResponseDto {
    id: number;
    title: string;
    subtitle?: string;
    description: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    location: string;
    address?: string;
    capacity: number;
    monthlyTuition: number;
    currency: string;
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
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=special-program-response.dto.d.ts.map