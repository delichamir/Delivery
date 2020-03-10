"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const checkJwt_1 = require("../../middlewares/checkJwt");
const checkRole_1 = require("../../middlewares/checkRole");
const router = express_1.Router();
// Get all products
router.get('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], ProductController_1.default.listAll);
// Get product by id
router.get('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], ProductController_1.default.getOneById);
// Create a new product
router.post('/add', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], ProductController_1.default.newProduct);
// Edit product by id
router.patch('/edit/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], ProductController_1.default.editProduct);
// Delete product by id
router.delete('/remove/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], ProductController_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map