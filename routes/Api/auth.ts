import { Router } from "express";
import {  registerUser, handleLogin } from "../../controllers/AuthController";
const router = Router();

router.route("/")
    .post(registerUser)
    .get(handleLogin);
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;

