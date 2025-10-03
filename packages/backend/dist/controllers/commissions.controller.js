"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionsController = void 0;
const database_1 = require("../config/database");
const Commission_1 = require("../entities/Commission");
const dayjs_1 = __importDefault(require("dayjs"));
class CommissionsController {
    static async getAllCommissions(req, res) {
        try {
            const { minAmount, maxAmount } = req.query;
            const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
            let query = commissionRepository.createQueryBuilder('commission');
            if (minAmount) {
                query = query.andWhere('commission.amount >= :minAmount', { minAmount });
            }
            if (maxAmount) {
                query = query.andWhere('commission.amount <= :maxAmount', { maxAmount });
            }
            const commissions = await query
                .orderBy('commission.createdAt', 'DESC')
                .getMany();
            const response = commissions.map(commission => ({
                id: commission.id,
                title: commission.title,
                description: commission.description,
                amount: commission.amount,
                duration: commission.duration,
                inclusions: commission.inclusions,
                createdAt: commission.createdAt ? (0, dayjs_1.default)(commission.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: commission.updatedAt ? (0, dayjs_1.default)(commission.updatedAt).format('DD MMM YYYY HH:mm') : null,
            }));
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching commissions:', error);
            res.status(500).json({ message: 'Error fetching commissions' });
        }
    }
    static async getCommissionById(req, res) {
        try {
            const { id } = req.params;
            const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
            const commission = await commissionRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!commission) {
                res.status(404).json({ message: 'Commission not found' });
                return;
            }
            const response = {
                id: commission.id,
                title: commission.title,
                description: commission.description,
                amount: commission.amount,
                duration: commission.duration,
                inclusions: commission.inclusions,
                createdAt: commission.createdAt ? (0, dayjs_1.default)(commission.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: commission.updatedAt ? (0, dayjs_1.default)(commission.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error fetching commission:', error);
            res.status(500).json({ message: 'Error fetching commission' });
        }
    }
    static async createCommission(req, res) {
        try {
            const commissionData = req.body;
            const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
            const commission = commissionRepository.create(commissionData);
            const savedCommission = await commissionRepository.save(commission);
            const response = {
                id: savedCommission.id,
                title: savedCommission.title,
                description: savedCommission.description,
                amount: savedCommission.amount,
                duration: savedCommission.duration,
                inclusions: savedCommission.inclusions,
                createdAt: savedCommission.createdAt ? (0, dayjs_1.default)(savedCommission.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: savedCommission.updatedAt ? (0, dayjs_1.default)(savedCommission.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.status(201).json(formattedResponse);
        }
        catch (error) {
            console.error('Error creating commission:', error);
            res.status(500).json({ message: 'Error creating commission' });
        }
    }
    static async updateCommission(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
            const commission = await commissionRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!commission) {
                res.status(404).json({ message: 'Commission not found' });
                return;
            }
            Object.assign(commission, updateData);
            const updatedCommission = await commissionRepository.save(commission);
            const response = {
                id: updatedCommission.id,
                title: updatedCommission.title,
                description: updatedCommission.description,
                amount: updatedCommission.amount,
                duration: updatedCommission.duration,
                inclusions: updatedCommission.inclusions,
                createdAt: updatedCommission.createdAt ? (0, dayjs_1.default)(updatedCommission.createdAt).format('DD MMM YYYY HH:mm') : null,
                updatedAt: updatedCommission.updatedAt ? (0, dayjs_1.default)(updatedCommission.updatedAt).format('DD MMM YYYY HH:mm') : null,
            };
            const formattedResponse = {
                success: true,
                data: response,
            };
            res.json(formattedResponse);
        }
        catch (error) {
            console.error('Error updating commission:', error);
            res.status(500).json({ message: 'Error updating commission' });
        }
    }
    static async deleteCommission(req, res) {
        try {
            const { id } = req.params;
            const commissionRepository = database_1.AppDataSource.getRepository(Commission_1.Commission);
            const commission = await commissionRepository.findOne({
                where: { id: parseInt(id) }
            });
            if (!commission) {
                res.status(404).json({ message: 'Commission not found' });
                return;
            }
            await commissionRepository.softDelete(parseInt(id));
            res.json({
                success: true,
                message: 'Commission deleted successfully'
            });
        }
        catch (error) {
            console.error('Error deleting commission:', error);
            res.status(500).json({ message: 'Error deleting commission' });
        }
    }
}
exports.CommissionsController = CommissionsController;
//# sourceMappingURL=commissions.controller.js.map