import { EVideoType } from '../shared/enum/EVideoType.enum';
export declare class Video {
    id: number;
    url: string;
    title: string;
    description?: string;
    type: EVideoType;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Video.d.ts.map