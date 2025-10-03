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
exports.CreateBookingDto = void 0;
const EBooking_enum_1 = require("../../../shared/enum/EBooking.enum");
const class_validator_1 = require("class-validator");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Full name must not exceed 255 characters' }),
    (0, class_validator_1.MinLength)(2, { message: 'Full name must be at least 2 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email address' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Email must not exceed 255 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: 'Phone number must not exceed 20 characters' }),
    (0, class_validator_1.MinLength)(10, { message: 'Phone number must be at least 10 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Event location must not exceed 255 characters' }),
    (0, class_validator_1.MinLength)(5, { message: 'Event location must be at least 5 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "eventLocation", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Please provide a valid date in ISO format' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "eventDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(EBooking_enum_1.Duration, { message: 'Please select a valid duration' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000, { message: 'Additional message must not exceed 1000 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "additionalMessage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'Commission ID must be a valid number' }),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "commissionId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Custom event type must not exceed 255 characters' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "customEventType", void 0);
//# sourceMappingURL=create-booking.dto.js.map