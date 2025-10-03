export interface IResponseDto<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}
export interface IUploadResDto {
    public_id: string;
    secure_url: string;
    url: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
}
export interface IUploadMultipleResDto {
    images: IUploadResDto[];
    count: number;
}
//# sourceMappingURL=IUploadResDto.d.ts.map