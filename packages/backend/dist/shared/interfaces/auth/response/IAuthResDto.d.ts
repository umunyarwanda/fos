export interface IAuthResDto {
    user: {
        id: number;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        phone: string;
        isActive: boolean;
    };
    token: string;
    expiresIn: number;
}
//# sourceMappingURL=IAuthResDto.d.ts.map