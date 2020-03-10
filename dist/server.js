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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const routes_1 = require("./v1/routes");
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new express application
    const app = express();
    // Call midlewares [ functions that have access to the request object (req), the response object (res) ]
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    // Set all routes from AppRoutes
    app.use('/api/v1', routes_1.default);
    app.listen(3000, () => {
        console.log('Application "Delivery" is up and running on port 3000');
    });
}))
    .catch(error => console.log('Connection error: ', error));
//# sourceMappingURL=server.js.map