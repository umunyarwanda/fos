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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const EVenueType_enum_1 = require("@/shared/enum/EVenueType.enum");
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Event.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Event.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Event.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "galleryImages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "featuredPerformers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EVenueType_enum_1.EVenueType, default: EVenueType_enum_1.EVenueType.INDOOR }),
    __metadata("design:type", String)
], Event.prototype, "venueType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organizerId' }),
    __metadata("design:type", User_1.User)
], Event.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "organizerId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "deletedAt", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
//# sourceMappingURL=Event.js.map