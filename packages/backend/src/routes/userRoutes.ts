import express, { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateUserDto } from '../dtos/users/request/create-user.dto';
import { UpdateUserDto } from '../dtos/users/request/update-user.dto';

const router: Router = express.Router();

// GET /api/users - Get all users (no validation needed)
router.get('/', UsersController.getAllUsers);

// GET /api/users/:id - Get user by ID (no validation needed)
router.get('/:id', UsersController.getUserById);

// POST /api/users - Create new user (with validation)
router.post('/', validateDto(CreateUserDto), UsersController.createUser);

// PUT /api/users/:id - Update user (with validation)
router.put('/:id', validateDto(UpdateUserDto), UsersController.updateUser);

// DELETE /api/users/:id - Delete user (soft delete) (no validation needed)
router.delete('/:id', UsersController.deleteUser);

// POST /api/users/:id/restore - Restore soft deleted user (no validation needed)
router.post('/:id/restore', UsersController.restoreUser);

export default router;