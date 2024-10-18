"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = __importDefault(require("../config/db.config"));
const login = async (req, res) => {
    try {
        const body = req.body;
        let findUser = await db_config_1.default.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (!findUser) {
            findUser = await db_config_1.default.user.create({
                data: body,
            });
        }
        const JWTPayload = {
            name: body.name,
            email: body.email,
            id: findUser.id,
        };
        const token = jsonwebtoken_1.default.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });
        res.status(200).json({
            message: "Logged in successfully!",
            user: {
                ...findUser,
                token: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "false"
        });
    }
};
exports.login = login;
