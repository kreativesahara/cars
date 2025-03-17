import { Router } from "express";
import { resetPassword } from "../../controllers/forgotPasswordController";

const router = Router();

router.route("/")
    .post(resetPassword)

export default router