"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const jwt_service_1 = require("../services/jwt.service");
class AuthController {
    static async register(req, res) {
        try {
            const registerData = req.body;
            const { email, username, password, confirmPassword, firstName, lastName, phone } = registerData;
            if (password !== confirmPassword) {
                res.status(400).json({
                    message: 'Password and confirm password do not match'
                });
                return;
            }
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
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
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            const user = userRepository.create({
                email,
                username,
                password: hashedPassword,
                firstName,
                lastName,
                phone
            });
            const savedUser = await userRepository.save(user);
            const token = jwt_service_1.JwtService.generateToken(savedUser);
            const expiresIn = jwt_service_1.JwtService.getTokenExpiration();
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error registering user:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).json({ message: 'Email or username already exists' });
            }
            else {
                res.status(500).json({ message: 'Error registering user' });
            }
        }
    }
    static async login(req, res) {
        try {
            const loginData = req.body;
            const { email, password } = loginData;
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            const token = jwt_service_1.JwtService.generateToken(user);
            const expiresIn = jwt_service_1.JwtService.getTokenExpiration();
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Error logging in user' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map