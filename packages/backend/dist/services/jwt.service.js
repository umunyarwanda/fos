"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    static generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        return jsonwebtoken_1.default.sign(payload, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRES_IN,
        });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
    static getTokenExpiration() {
        const expiresIn = this.JWT_EXPIRES_IN;
        if (expiresIn.endsWith('h')) {
            return parseInt(expiresIn) * 3600;
        }
        else if (expiresIn.endsWith('d')) {
            return parseInt(expiresIn) * 86400;
        }
        else if (expiresIn.endsWith('m')) {
            return parseInt(expiresIn) * 60;
        }
        return 86400;
    }
}
exports.JwtService = JwtService;
JwtService.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
JwtService.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
//# sourceMappingURL=jwt.service.js.map