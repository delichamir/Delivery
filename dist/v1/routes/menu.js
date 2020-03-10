"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MenuController_1 = require("../controllers/MenuController");
const checkJwt_1 = require("../../middlewares/checkJwt");
const checkRole_1 = require("../../middlewares/checkRole");
const router = express_1.Router();
// Get all menu
router.get('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], MenuController_1.default.listAll);
// Get menu by id
router.get('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN', 'CUSTOMER'])], MenuController_1.default.getOneById);
// Create a new menu
router.post('/add', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], MenuController_1.default.newMenu);
// Edit menu by id
router.patch('/edit/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], MenuController_1.default.editMenu);
// Delete menu by id
router.delete('/remove/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], MenuController_1.default.deleteMenu);
exports.default = router;
//# sourceMappingURL=menu.js.map