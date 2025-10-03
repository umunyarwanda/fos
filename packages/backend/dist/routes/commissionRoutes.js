"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commissions_controller_1 = require("../controllers/commissions.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_commission_dto_1 = require("../dtos/commissions/request/create-commission.dto");
const update_commission_dto_1 = require("../dtos/commissions/request/update-commission.dto");
const router = express_1.default.Router();
router.get('/', commissions_controller_1.CommissionsController.getAllCommissions);
router.get('/:id', commissions_controller_1.CommissionsController.getCommissionById);
router.post('/', (0, validation_middleware_1.validateDto)(create_commission_dto_1.CreateCommissionDto), commissions_controller_1.CommissionsController.createCommission);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_commission_dto_1.UpdateCommissionDto), commissions_controller_1.CommissionsController.updateCommission);
router.delete('/:id', commissions_controller_1.CommissionsController.deleteCommission);
exports.default = router;
//# sourceMappingURL=commissionRoutes.js.map