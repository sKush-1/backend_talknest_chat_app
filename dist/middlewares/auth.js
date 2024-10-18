"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    const myuser = {
        id: 1
    };
    req.user = myuser;
    console.log(req.user.id);
    next();
};
exports.default = authMiddleware;
