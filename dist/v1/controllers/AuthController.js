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
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const client_1 = require("../../entity/client");
const config_1 = require("../../config/config");
const checkValidation_1 = require("../../middlewares/checkValidation");
class AuthController {
}
// Authorization
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).json({
            message: 'username and password is required.',
            status: 'false'
        });
    }
    // Get user from database
    const userRepository = typeorm_1.getRepository(client_1.Client);
    let user;
    try {
        user = yield userRepository.findOneOrFail({ where: { username } });
    }
    catch (error) {
        res.status(409).json({
            message: 'This user is not find. Try another.',
            status: 'false'
        });
    }
    // Check if login and encrypted password match
    let match = yield checkValidation_1.Validation(username, password).catch(err => {
        console.error('\n No such username find in base: ', err);
    });
    if (!match) {
        res.status(401).json({
            message: 'username or password is incorrect. Try again',
            status: 'false'
        });
        return;
    }
    // Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.client_id, username: user.full_name }, config_1.default.jwtSecret, { expiresIn: '1h' });
    // Send the jwt in the response
    res.json({
        token: token,
        status: 'success'
    });
});
// Change password for user
AuthController.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    // Get parameters from the body
    const { username, oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    // Get user from the database
    const userRepository = typeorm_1.getRepository(client_1.Client);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (id) {
        res.status(401).send();
    }
    // Check if old password matchs
    if (!checkValidation_1.Validation(username, oldPassword)) {
        res.status(401).send();
        return;
    }
    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);
    res.status(204).send();
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map