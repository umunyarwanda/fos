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
exports.UpdateContactDto = void 0;
const class_validator_1 = require("class-validator");
const Contact_1 = require("../../../entities/Contact");
class UpdateContactDto {
}
exports.UpdateContactDto = UpdateContactDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Full name must not exceed 255 characters' }),
    (0, class_validator_1.MinLength)(2, { message: 'Full name must be at least 2 characters' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Email must not exceed 255 characters' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: 'Phone number must not exceed 20 characters' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Contact_1.ContactSubject, { message: 'Please select a valid subject' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Message must be at least 10 characters' }),
    (0, class_validator_1.MaxLength)(2000, { message: 'Message must not exceed 2000 characters' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Contact_1.ContactStatus, { message: 'Please select a valid status' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'Admin notes must not exceed 1000 characters' }),
    __metadata("design:type", String)
], UpdateContactDto.prototype, "adminNotes", void 0);
//# sourceMappingURL=update-contact.dto.js.map