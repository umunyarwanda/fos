import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

export class JwtService {
  private static readonly JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

  /**
   * Generate JWT token for user
   */
  static generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Get token expiration time in seconds
   */
  static getTokenExpiration(): number {
    const expiresIn = this.JWT_EXPIRES_IN;
    if (expiresIn.endsWith('h')) {
      return parseInt(expiresIn) * 3600; // hours to seconds
    } else if (expiresIn.endsWith('d')) {
      return parseInt(expiresIn) * 86400; // days to seconds
    } else if (expiresIn.endsWith('m')) {
      return parseInt(expiresIn) * 60; // minutes to seconds
    }
    return 86400; // default 24 hours
  }
}