import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateDto } from '../middleware/validation.middleware';
import { LoginDto } from '../dtos/auth/request/login.dto';
import { RegisterDto } from '../dtos/auth/request/register.dto';
import { AUTH_URL } from '../shared/variables/urls';

const router: Router = express.Router();

// POST /api/auth/register - Register new user
router.post(AUTH_URL.REGISTER, validateDto(RegisterDto), AuthController.register);

// POST /api/auth/login - Login user
router.post(AUTH_URL.LOGIN, validateDto(LoginDto), AuthController.login);

export default router;