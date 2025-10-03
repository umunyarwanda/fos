"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_user_dto_1 = require("../dtos/users/request/create-user.dto");
const update_user_dto_1 = require("../dtos/users/request/update-user.dto");
const router = express_1.default.Router();
router.get('/', users_controller_1.UsersController.getAllUsers);
router.get('/:id', users_controller_1.UsersController.getUserById);
router.post('/', (0, validation_middleware_1.validateDto)(create_user_dto_1.CreateUserDto), users_controller_1.UsersController.createUser);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_user_dto_1.UpdateUserDto), users_controller_1.UsersController.updateUser);
router.delete('/:id', users_controller_1.UsersController.deleteUser);
router.post('/:id/restore', users_controller_1.UsersController.restoreUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map