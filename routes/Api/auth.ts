import { Router } from "express";
import {  registerUser, handleLogin } from "../../controllers/AuthController";
const router = Router();

router.route("/")
    .post(registerUser)
router.route("/login")
    .post(handleLogin)
    .get()
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;

