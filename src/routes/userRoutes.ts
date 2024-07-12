import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router();
const userController = new UserController();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

export default router;
