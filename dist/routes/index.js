"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const chatGroupController_1 = require("../controllers/chatGroupController");
const router = (0, express_1.Router)();
router.post("/auth/login", authController_1.login);
router.post("/chat-group", auth_1.default, chatGroupController_1.store);
exports.default = router;
