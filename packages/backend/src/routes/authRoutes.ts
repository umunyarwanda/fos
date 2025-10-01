import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateDto } from '../middleware/validation.middleware';
import { LoginDto } from '../dtos/auth/request/login.dto';
import { RegisterDto } from '../dtos/auth/request/register.dto';

const router: Router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', validateDto(RegisterDto), AuthController.register);

// POST /api/auth/login - Login user
router.post('/login', validateDto(LoginDto), AuthController.login);

export default router;