import { ICreeateUserReqDto } from '@/shared/interfaces/users/request/ICreeateUserReqDto';
export declare class CreateUserDto implements ICreeateUserReqDto {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone?: string;
}
//# sourceMappingURL=create-user.dto.d.ts.map