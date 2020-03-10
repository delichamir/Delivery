"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const client_1 = require("../entity/client");
class AddUsers1583060614864 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(client_1.Client);
            // Adding users
            let user = new client_1.Client();
            user.full_name = 'admin';
            user.password = 'admin';
            user.hashPassword();
            user.role = 'ADMIN';
            user.email = 'admin@delivery.com';
            yield userRepository.save(user);
            let user2 = new client_1.Client();
            user2.full_name = 'user2';
            user2.password = 'pass';
            user2.hashPassword();
            user2.role = 'CUSTOMER';
            user2.email = 'user2@delivery.com';
            yield userRepository.save(user2);
            let user3 = new client_1.Client();
            user3.full_name = 'user3';
            user3.password = 'pass';
            user3.hashPassword();
            user3.role = 'CUSTOMER';
            user3.email = 'user3@delivery.com';
            yield userRepository.save(user3);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AddUsers1583060614864 = AddUsers1583060614864;
//# sourceMappingURL=1583060614864-AddUsers.js.map