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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcryptjs");
let Client = class Client {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Client.prototype, "client_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(4, 20),
    __metadata("design:type", String)
], Client.prototype, "full_name", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(4, 100),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Client.prototype, "role", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
Client = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['full_name'])
], Client);
exports.Client = Client;
//# sourceMappingURL=client.js.map