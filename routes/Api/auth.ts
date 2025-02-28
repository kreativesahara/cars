import { Router } from "express";
import {  registerUser, handleLogin } from "../../controllers/AuthController";
const router = Router();

router.route("/")
    .post(registerUser)
router.route("/login")
    .post(handleLogin)
export default router;

