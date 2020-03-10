"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
exports.checkJwt = (req, res, next) => {
    // Get the jwt token from the head
    const token = req.headers['auth'];
    let jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        // If token is not valid, respond 401
        res.status(401).send('Token is not valid');
        return;
    }
    // Sending new token, that valid for 1 hour
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config_1.default.jwtSecret, {
        expiresIn: '1h'
    });
    res.setHeader('token', newToken);
    //Call the next middleware or controller
    next();
};
//# sourceMappingURL=checkJwt.js.map