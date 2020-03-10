"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const checkJwt_1 = require("../../middlewares/checkJwt");
const checkRole_1 = require("../../middlewares/checkRole");
const router = express_1.Router();
// Get all users
router.get('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.listAll);
// Get user by id
router.get('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.getOneById);
// Create a new user
router.post('/add', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.newUser);
// Edit user by id
router.patch('/edit/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.editUser);
// Delete user by id
router.delete('/remove/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map