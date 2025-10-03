import express, { Router } from 'express';
import { CommissionsController } from '../controllers/commissions.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateCommissionDto } from '../dtos/commissions/request/create-commission.dto';
import { UpdateCommissionDto } from '../dtos/commissions/request/update-commission.dto';

const router: Router = express.Router();

// GET /api/commissions - Get all commissions (no validation needed)
router.get('/', CommissionsController.getAllCommissions);

// GET /api/commissions/:id - Get commission by ID (no validation needed)
router.get('/:id', CommissionsController.getCommissionById);

// POST /api/commissions - Create new commission (with validation)
router.post('/', validateDto(CreateCommissionDto), CommissionsController.createCommission);

// PUT /api/commissions/:id - Update commission (with validation)
router.put('/:id', validateDto(UpdateCommissionDto), CommissionsController.updateCommission);

// DELETE /api/commissions/:id - Delete commission (no validation needed)
router.delete('/:id', CommissionsController.deleteCommission);

export default router;