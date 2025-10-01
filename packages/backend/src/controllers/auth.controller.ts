import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { LoginDto } from '../dtos/auth/request/login.dto';
import { RegisterDto } from '../dtos/auth/request/register.dto';
import { JwtService } from '../services/jwt.service';
import { IResponseDto } from '../shared/interfaces/IResponseDto';
import { IRegisterResDto } from '../shared/interfaces/auth/response/IRegisterResDto';
import { ILoginResDto } from '../shared/interfaces/auth/response/ILoginResDto';

export class AuthController {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterRequest'
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       409:
   *         description: Conflict - email or username already exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const registerData: RegisterDto = req.body;
      const { email, username, password, confirmPassword, firstName, lastName, phone } = registerData;
      
      // Validate password confirmation
      if (password !== confirmPassword) {
        res.status(400).json({ 
          message: 'Password and confirm password do not match' 
        });
        return;
      }
      
      const userRepository = AppDataSource.getRepository(User);
      
      // Check if user already exists
      const existingUser = await userRepository.findOne({
        where: [
          { email },
          { username }
        ]
      });
      
      if (existingUser) {
        res.status(409).json({ 
          message: 'Email or username already exists' 
        });
        return;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = userRepository.create({
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone
      });
      
      const savedUser = await userRepository.save(user);
      
      // Generate JWT token
      const token = JwtService.generateToken(savedUser);
      const expiresIn = JwtService.getTokenExpiration();
      
      // Create response
      const response: IRegisterResDto = {
        user: {
          id: savedUser.id,
          email: savedUser.email,
          username: savedUser.username,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          phone: savedUser.phone || '',
          isActive: savedUser.isActive,
        },
        token,
        expiresIn
      };
      
      const formattedResponse: IResponseDto<IRegisterResDto> = {
        success: true,
        data: response,
      };
      
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error registering user:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'Email or username already exists' });
      } else {
        res.status(500).json({ message: 'Error registering user' });
      }
    }
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       401:
   *         description: Unauthorized - invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDto = req.body;
      const { email, password } = loginData;
      
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      
      // Generate JWT token
      const token = JwtService.generateToken(user);
      const expiresIn = JwtService.getTokenExpiration();
      
      // Create response
      const response: ILoginResDto = {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || '',
          isActive: user.isActive,
        },
        token,
        expiresIn
      };
      
      const formattedResponse: IResponseDto<ILoginResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Error logging in user' });
    }
  }
}