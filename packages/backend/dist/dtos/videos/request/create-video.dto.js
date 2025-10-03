"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoDto = void 0;
const EVideoType_enum_1 = require("../../../shared/enum/EVideoType.enum");
const class_validator_1 = require("class-validator");
class CreateVideoDto {
}
exports.CreateVideoDto = CreateVideoDto;
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid URL' }),
    (0, class_validator_1.MaxLength)(500, { message: 'URL must not exceed 500 characters' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Title must be at least 2 characters' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Title must not exceed 255 characters' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'Description must not exceed 1000 characters' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EVideoType_enum_1.EVideoType, { message: 'Please select a valid video type' }),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVideoDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateVideoDto.prototype, "isFeatured", void 0);
//# sourceMappingURL=create-video.dto.js.map