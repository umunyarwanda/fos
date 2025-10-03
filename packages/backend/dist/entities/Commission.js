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
exports.Commission = exports.CommissionType = exports.CommissionStatus = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
var CommissionStatus;
(function (CommissionStatus) {
    CommissionStatus["PENDING"] = "pending";
    CommissionStatus["APPROVED"] = "approved";
    CommissionStatus["IN_PROGRESS"] = "in_progress";
    CommissionStatus["COMPLETED"] = "completed";
    CommissionStatus["CANCELLED"] = "cancelled";
})(CommissionStatus || (exports.CommissionStatus = CommissionStatus = {}));
var CommissionType;
(function (CommissionType) {
    CommissionType["PERFORMANCE"] = "performance";
    CommissionType["RECORDING"] = "recording";
    CommissionType["WORKSHOP"] = "workshop";
    CommissionType["CONSULTATION"] = "consultation";
    CommissionType["OTHER"] = "other";
})(CommissionType || (exports.CommissionType = CommissionType = {}));
let Commission = class Commission {
};
exports.Commission = Commission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Commission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Commission.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Commission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Commission.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Commission.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Commission.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Commission.prototype, "inclusions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.commission),
    __metadata("design:type", Array)
], Commission.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Commission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Commission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Commission.prototype, "deletedAt", void 0);
exports.Commission = Commission = __decorate([
    (0, typeorm_1.Entity)('commissions')
], Commission);
//# sourceMappingURL=Commission.js.map