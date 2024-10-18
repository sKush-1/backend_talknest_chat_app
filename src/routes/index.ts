import { Router } from "express";
import { login } from "../controllers/authController";
import authMiddleware from "../middlewares/auth";
import { destroy, index, show, store, update } from "../controllers/chatGroupController";
import { userIndex, userStore } from "../controllers/chatGroupUserController";
import { chatIndex } from "../controllers/chatController";

const router = Router();

// chat group routes
router.post("/auth/login", login);
router.post("/chat-group",  authMiddleware,store);
router.get("/chat-group",authMiddleware, index);
router.get("/chat-group/:id", show);
router.put("/chat-group/:id", authMiddleware, update);
router.delete("/chat-group/:id", authMiddleware, destroy);

// chat group users

router.get("/chat-group-users", userIndex);
router.post("/chat-group-users", userStore);

// messages
router.get("/chats/:groupId",chatIndex);




export default router;
