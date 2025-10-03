"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
class UsersController {
    static async getAllUsers(req, res) {
        try {
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const users = await userRepository.find();
            const response = users.map(user => ({
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone || '',
                isActive: user.isActive,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOne({ where: { id: parseInt(id) } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const response = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone || '',
                isActive: user.isActive,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Error fetching user' });
        }
    }
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const { email, username, password, confirmPassword, firstName, lastName, phone } = userData;
            if (password !== confirmPassword) {
                res.status(400).json({
                    message: 'Password and confirm password do not match'
                });
                return;
            }
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
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
            const response = {
                id: savedUser.id,
                email: savedUser.email,
                username: savedUser.username,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                phone: savedUser.phone || '',
                isActive: savedUser.isActive,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating user:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).json({ message: 'Email or username already exists' });
            }
            else {
                res.status(500).json({ message: 'Error creating user' });
            }
        }
    }
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            if (updateData.password && updateData.confirmPassword && updateData.password !== updateData.confirmPassword) {
                res.status(400).json({
                    message: 'Password and confirm password do not match'
                });
                return;
            }
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOne({ where: { id: parseInt(id) } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            Object.keys(updateData).forEach(key => {
                if (updateData[key] !== undefined) {
                    user[key] = updateData[key];
                }
            });
            const updatedUser = await userRepository.save(user);
            const response = {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phone: updatedUser.phone || '',
                isActive: updatedUser.isActive,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating user:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).json({ message: 'Email or username already exists' });
            }
            else {
                res.status(500).json({ message: 'Error updating user' });
            }
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOne({ where: { id: parseInt(id) } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            await userRepository.softRemove(user);
            const response = {
                message: 'User deleted successfully'
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
    static async restoreUser(req, res) {
        try {
            const { id } = req.params;
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
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
            user.deletedAt = undefined;
            await userRepository.save(user);
            const response = {
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
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error restoring user:', error);
            res.status(500).json({ message: 'Error restoring user' });
        }
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map