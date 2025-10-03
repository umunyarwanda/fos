import { EVideoType } from '../../../enum/EVideoType.enum';
export interface ICreateVideoReqDto {
    url: string;
    title: string;
    description?: string;
    type: EVideoType;
    isActive?: boolean;
    isFeatured?: boolean;
}
//# sourceMappingURL=ICreateVideoReqDto.d.ts.map