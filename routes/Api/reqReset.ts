import { Router } from "express";
import { requestPasswordReset } from "../../controllers/forgotPasswordController";

const router = Router();

router.route("/")
    .post(requestPasswordReset)

export default router