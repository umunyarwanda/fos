import { EVideoType } from "../../../enum/EVideoType.enum";

export interface IGetVideoResDto {
  id: number;
  url: string;
  title: string;
  description?: string | null;
  type: EVideoType;
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}