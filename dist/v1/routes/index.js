"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const user_1 = require("./user");
const restaurant_1 = require("./restaurant");
const product_1 = require("./product");
const menu_1 = require("./menu");
const routes = express_1.Router();
routes.get('/', function (req, res) {
    res.json({
        text: 'Welcome to delivery api !'
    });
});
routes.use('/auth', auth_1.default);
routes.use('/client', user_1.default);
routes.use('/restaurant', restaurant_1.default);
routes.use('/product', product_1.default);
routes.use('/menu', menu_1.default);
// routes.use('/order', order);
// routes.use('/cart', cart);
exports.default = routes;
//# sourceMappingURL=index.js.map