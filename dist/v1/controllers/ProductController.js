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
const product_1 = require("../../entity/product");
class ProductController {
}
// listAll
ProductController.listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get products list from database
    const productRepository = typeorm_1.getRepository(product_1.Product);
    const product = yield productRepository.find({
        select: [
            'product_id',
            'name',
            'category',
            'count',
            'price',
            'menu_id'
        ]
    });
    res.send(product);
});
// getOneById
ProductController.getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get the product from database
    const productRepository = typeorm_1.getRepository(product_1.Product);
    try {
        const user = yield productRepository.findOneOrFail(id, {
            select: [
                'product_id',
                'name',
                'category',
                'count',
                'price',
                'menu_id'
            ]
        });
    }
    catch (error) {
        res.status(404).send('Product not found');
    }
});
//newProduct
ProductController.newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get parameters from the body
    let { name, category, count, price, menu_id } = req.body;
    let product = new product_1.Product();
    product.name = name;
    product.category = category;
    product.count = count;
    product.price = price;
    product.menu_id = menu_id;
    // Validade if the parameters are ok
    const errors = yield class_validator_1.validate(product);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to save. If fails, the name is already in use
    const productRepository = typeorm_1.getRepository(product_1.Product);
    try {
        yield productRepository.save(product);
    }
    catch (e) {
        res.status(409).send('Product already exist');
        return;
    }
    // If all ok, send 201 response
    res.status(201).send('Product created successful');
});
// editProduct
ProductController.editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    // Get values from the body
    const { name, category, count, price, menu_id } = req.body;
    // Try to find user on database
    const productRepository = typeorm_1.getRepository(product_1.Product);
    let product;
    try {
        product = yield productRepository.findOneOrFail(id);
    }
    catch (error) {
        // If not found, send a 404 response
        res.status(404).send('Product not found');
        return;
    }
    // Validate the new values on model
    product.name = name;
    product.category = category;
    product.count = count;
    product.price = price;
    product.menu_id = menu_id;
    const errors = yield class_validator_1.validate(product);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Try to safe, if fails, that means product already in use
    try {
        yield productRepository.save(product);
    }
    catch (e) {
        res.status(409).send('Product already in use');
        return;
    }
    // After all send a 204 (no content)
    res.status(204).send();
});
// deleteProduct
ProductController.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the ID from the url
    const id = req.params.id;
    const productRepository = typeorm_1.getRepository(product_1.Product);
    let product;
    try {
        product = yield productRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send('Product not found');
        return;
    }
    productRepository.delete(id);
    // After all send a 204 (no content)
    res.status(204).send();
});
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map