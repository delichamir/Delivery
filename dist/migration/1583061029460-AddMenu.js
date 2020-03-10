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
const menu_1 = require("../entity/menu");
class AddMenu1583061029460 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(menu_1.Menu);
            let menu = new menu_1.Menu();
            menu.name = 'Основное меню Додо Пиццы';
            yield userRepository.save(menu);
            let menu2 = new menu_1.Menu();
            menu2.name = "Основное меню Домино'с пиццы";
            yield userRepository.save(menu2);
            let menu3 = new menu_1.Menu();
            menu3.name = 'Основное меню Папа Джонса';
            yield userRepository.save(menu3);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AddMenu1583061029460 = AddMenu1583061029460;
//# sourceMappingURL=1583061029460-AddMenu.js.map