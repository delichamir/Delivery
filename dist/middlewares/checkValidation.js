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
const bcrypt = require("bcryptjs");
exports.Validation = (login, unencryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = typeorm_1.getManager().getRepository(client_1.Client);
    const user = yield clientRepository.findOne({ full_name: login });
    if (login === user.full_name &&
        bcrypt.compareSync(unencryptedPassword, user.password)) {
        return true;
    }
    return false;
});
//# sourceMappingURL=checkValidation.js.map