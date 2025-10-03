import { ICreateSpecialProgramReqDto } from '@/shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto';
declare class InstructorDto {
    name: string;
    title: string;
    subtitle: string;
    role: string;
    qualifications: string;
    experience: string;
    image: string;
}
declare class CurriculumDto {
    phase: string;
    duration: string;
    description: string;
    skills: string[];
}
declare class ScheduleDto {
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
}
export declare class CreateSpecialProgramDto implements ICreateSpecialProgramReqDto {
    title: string;
    subtitle?: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    address?: string;
    capacity: number;
    monthlyTuition: number;
    minAge: number;
    maxAge: number;
    isFeatured?: boolean;
    tags?: string[];
    galleryImages?: string[];
    instructors?: InstructorDto[];
    curriculum?: CurriculumDto[];
    whatsIncluded?: string[];
    schedule?: ScheduleDto[];
}
export {};
//# sourceMappingURL=create-special-program.dto.d.ts.map