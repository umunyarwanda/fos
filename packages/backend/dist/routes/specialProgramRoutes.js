"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const special_programs_controller_1 = require("../controllers/special-programs.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_special_program_dto_1 = require("../dtos/special-programs/request/create-special-program.dto");
const update_special_program_dto_1 = require("../dtos/special-programs/request/update-special-program.dto");
const router = express_1.default.Router();
router.get('/', special_programs_controller_1.SpecialProgramsController.getAllSpecialPrograms);
router.get('/featured', special_programs_controller_1.SpecialProgramsController.getFeaturedSpecialPrograms);
router.get('/:id', special_programs_controller_1.SpecialProgramsController.getSpecialProgramById);
router.post('/', (0, validation_middleware_1.validateDto)(create_special_program_dto_1.CreateSpecialProgramDto), special_programs_controller_1.SpecialProgramsController.createSpecialProgram);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_special_program_dto_1.UpdateSpecialProgramDto), special_programs_controller_1.SpecialProgramsController.updateSpecialProgram);
router.delete('/:id', special_programs_controller_1.SpecialProgramsController.deleteSpecialProgram);
exports.default = router;
//# sourceMappingURL=specialProgramRoutes.js.map