import { User } from '../entities/User';
export declare class JwtService {
    private static readonly JWT_SECRET;
    private static readonly JWT_EXPIRES_IN;
    static generateToken(user: User): string;
    static verifyToken(token: string): any;
    static getTokenExpiration(): number;
}
//# sourceMappingURL=jwt.service.d.ts.map