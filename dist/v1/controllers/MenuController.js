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
const class_validator_1 = require("class-validator");
const menu_1 = require("../../entity/menu");
class MenuController {
}
// listAll
MenuController.listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get menu list from database
    const menuRepository = typeorm_1.getRepository(menu_1.Menu);
    const product = yield menuRepository.find({
        select: ['menu_id', 'name']
    });
    res.send(product);
});
// getOneById
MenuController.getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get the menu from database
    const menuRepository = typeorm_1.getRepository(menu_1.Menu);
    try {
        const user = yield menuRepository.findOneOrFail(id, {
            select: ['menu_id', 'name']
        });
    }
    catch (error) {
        res.status(404).send('Product not found');
    }
});
//newMenu
MenuController.newMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get parameters from the body
    let { name } = req.body;
    let menu = new menu_1.Menu();
    menu.name = name;
    // Validade if the parameters are ok
    const errors = yield class_validator_1.validate(menu);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to save. If fails, the name is already in use
    const menuRepository = typeorm_1.getRepository(menu_1.Menu);
    try {
        yield menuRepository.save(menu);
    }
    catch (e) {
        res.status(409).send('Menu already exist');
        return;
    }
    // If all ok, send 201 response
    res.status(201).send('Menu created successful');
});
// editMenu
MenuController.editMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get values from the body
    const { name, category, count, price, menu_id } = req.body;
    // Try to find user on database
    const menuRepository = typeorm_1.getRepository(menu_1.Menu);
    let menu;
    try {
        menu = yield menuRepository.findOneOrFail(id);
    }
    catch (error) {
        // If not found, send a 404 response
        res.status(404).send('Menu not found');
        return;
    }
    // Validate the new values on model
    menu.name = name;
    const errors = yield class_validator_1.validate(menu);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to safe, if fails, that means menu already in use
    try {
        yield menuRepository.save(name);
    }
    catch (e) {
        res.status(409).send('Menu already in use');
        return;
    }
    // After all send a 204 (no content)
    res.status(204).send();
});
// deleteMenu
MenuController.deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    const menuRepository = typeorm_1.getRepository(menu_1.Menu);
    let menu;
    try {
        menu = yield menuRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('Menu not found');
        return;
    }
    menuRepository.delete(id);
    // After all send a 204 (no content)
    res.status(204).send();
});
exports.default = MenuController;
//# sourceMappingURL=MenuController.js.map