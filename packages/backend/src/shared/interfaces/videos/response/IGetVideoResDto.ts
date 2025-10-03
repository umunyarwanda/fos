import { VideoType } from '../../../entities/Video';

export interface IGetVideoResDto {
  id: number;
  url: string;
  title: string;
  description?: string | null;
  type: VideoType;
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}