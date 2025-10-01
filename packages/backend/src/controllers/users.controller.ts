import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UserResponseDto } from '../dtos/users/response/user-response.dto';
import { ICreeateUserReqDto } from '../shared/interfaces/users/request/ICreeateUserReqDto';
import { IUpdateUserReqDto } from '../shared/interfaces/users/request/IUpdateUserReqDto';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { UpdateUserDto } from '../dtos/users/request/update-user.dto';
import { IGetUserResDto } from '@/shared/interfaces/users/response/IGetUserResDto';
import { IResponseDto } from '@/shared/interfaces/IResponseDto';
import { IDeleteUserResDto } from '@/shared/interfaces/users/response/IDeleteUserResDto';
import { IRestoreUserResDto } from '@/shared/interfaces/users/response/IRestoreUserResDto';

export class UsersController {
  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  // GET /api/users - Get all users
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      const response: IGetUserResDto[] = users.map(user => ({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        isActive: user.isActive,
      }));

      const formattedResponse: IResponseDto<IGetUserResDto[]> = {
        success: true,
        data: response,
      }
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
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
  // GET /api/users/:id - Get user by ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      const response: IGetUserResDto = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        isActive: user.isActive,
      }
      const formattedResponse: IResponseDto<IGetUserResDto> = {
        success: true,
        data: response,
      }
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  }

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Create new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserRequest'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
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
  // POST /api/users - Create new user
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICreeateUserReqDto = req.body;
      const { email, username, password, confirmPassword, firstName, lastName, phone } = userData;
      
      // Validate password confirmation
      if (password !== confirmPassword) {
        res.status(400).json({ 
          message: 'Password and confirm password do not match' 
        });
        return;
      }
      
      const userRepository = AppDataSource.getRepository(User);
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const user = userRepository.create({
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone
      });
      
      const savedUser = await userRepository.save(user);
      
      const response: IGetUserResDto = {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        phone: savedUser.phone || '',
        isActive: savedUser.isActive,
      };
      
      const formattedResponse: IResponseDto<IGetUserResDto> = {
        success: true,
        data: response,
      };
      
      res.status(201).json(formattedResponse);
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'Email or username already exists' });
      } else {
        res.status(500).json({ message: 'Error creating user' });
      }
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Update user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserRequest'
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request - validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ValidationError'
   *       404:
   *         description: User not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
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
  // PUT /api/users/:id - Update user
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateUserDto = req.body;
      
      // Validate password confirmation if both password and confirmPassword are provided
      if (updateData.password && updateData.confirmPassword && updateData.password !== updateData.confirmPassword) {
        res.status(400).json({ 
          message: 'Password and confirm password do not match' 
        });
        return;
      }
      
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      // Update only provided fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof UpdateUserDto] !== undefined) {
          (user as any)[key] = updateData[key as keyof UpdateUserDto];
        }
      });
      
      const updatedUser = await userRepository.save(user);
      
      const response: IGetUserResDto = {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone || '',
        isActive: updatedUser.isActive,
      };
      
      const formattedResponse: IResponseDto<IGetUserResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error: any) {
      console.error('Error updating user:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'Email or username already exists' });
      } else {
        res.status(500).json({ message: 'Error updating user' });
      }
    }
  }

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Delete user (soft delete)
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: 'User deleted successfully'
   *       404:
   *         description: User not found
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
  // DELETE /api/users/:id - Delete user (soft delete)
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: parseInt(id) } });
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      // Soft delete - TypeORM will set deletedAt timestamp
      await userRepository.softRemove(user);
      
      const response: IDeleteUserResDto = {
        message: 'User deleted successfully'
      };
      
      const formattedResponse: IResponseDto<IDeleteUserResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }

  /**
   * @swagger
   * /api/users/{id}/restore:
   *   post:
   *     summary: Restore soft deleted user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User restored successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: 'User restored successfully'
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request - user is not deleted
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: User not found
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
  // GET /api/users/:id/restore - Restore soft deleted user
  static async restoreUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      
      // Find user including soft deleted ones
      const user = await userRepository.findOne({ 
        where: { id: parseInt(id) },
        withDeleted: true 
      });
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      if (!user.deletedAt) {
        res.status(400).json({ message: 'User is not deleted' });
        return;
      }
      
      // Restore user by setting deletedAt to null
      user.deletedAt = undefined;
      await userRepository.save(user);
      
      const response: IRestoreUserResDto = {
        message: 'User restored successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || '',
          isActive: user.isActive,
        }
      };
      
      const formattedResponse: IResponseDto<IRestoreUserResDto> = {
        success: true,
        data: response,
      };
      
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error restoring user:', error);
      res.status(500).json({ message: 'Error restoring user' });
    }
  }
}
