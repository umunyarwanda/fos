"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
function validateDto(dtoClass) {
    return async (req, res, next) => {
        try {
            const dto = (0, class_transformer_1.plainToClass)(dtoClass, req.body);
            const errors = await (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const errorMessages = errors.map(error => {
                    return {
                        property: error.property,
                        constraints: error.constraints
                    };
                });
                res.status(400).json({
                    message: 'Validation failed',
                    errors: errorMessages
                });
                return;
            }
            req.body = dto;
            next();
        }
        catch (error) {
            console.error('Validation middleware error:', error);
            res.status(500).json({ message: 'Internal server error during validation' });
        }
    };
}
//# sourceMappingURL=validation.middleware.js.map