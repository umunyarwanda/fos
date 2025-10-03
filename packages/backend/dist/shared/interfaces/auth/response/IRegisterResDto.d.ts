export interface IRegisterResDto {
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
//# sourceMappingURL=IRegisterResDto.d.ts.map