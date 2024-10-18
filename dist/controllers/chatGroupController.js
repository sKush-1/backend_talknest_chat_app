"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const store = async (req, res) => {
    try {
        const { title, passcode } = req.body;
        // console.log(req.body)
        // console.log(req.user.)
        await db_config_1.default.chatGroup.create({
            data: {
                title,
                passcode,
                user_id: 1,
            }
        });
        res.status(201).json({
            success: true,
            message: "Chat group created sucessfully"
        });
        // return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
        // return;
    }
};
exports.store = store;
