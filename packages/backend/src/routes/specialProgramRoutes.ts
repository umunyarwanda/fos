import express, { Router } from 'express';
import { SpecialProgramsController } from '../controllers/special-programs.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateSpecialProgramDto } from '../dtos/special-programs/request/create-special-program.dto';
import { UpdateSpecialProgramDto } from '../dtos/special-programs/request/update-special-program.dto';

const router: Router = express.Router();

// GET /api/special-programs - Get all special programs (no validation needed)
router.get('/', SpecialProgramsController.getAllSpecialPrograms);

// GET /api/special-programs/featured - Get featured special programs (no validation needed)
router.get('/featured', SpecialProgramsController.getFeaturedSpecialPrograms);

// GET /api/special-programs/:id - Get special program by ID (no validation needed)
router.get('/:id', SpecialProgramsController.getSpecialProgramById);

// POST /api/special-programs - Create new special program (with validation)
router.post('/', validateDto(CreateSpecialProgramDto), SpecialProgramsController.createSpecialProgram);

// PUT /api/special-programs/:id - Update special program (with validation)
router.put('/:id', validateDto(UpdateSpecialProgramDto), SpecialProgramsController.updateSpecialProgram);

// DELETE /api/special-programs/:id - Delete special program (soft delete) (no validation needed)
router.delete('/:id', SpecialProgramsController.deleteSpecialProgram);

export default router;