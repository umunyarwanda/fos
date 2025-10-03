"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const login_dto_1 = require("../dtos/auth/request/login.dto");
const register_dto_1 = require("../dtos/auth/request/register.dto");
const router = express_1.default.Router();
router.post('/register', (0, validation_middleware_1.validateDto)(register_dto_1.RegisterDto), auth_controller_1.AuthController.register);
router.post('/login', (0, validation_middleware_1.validateDto)(login_dto_1.LoginDto), auth_controller_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map