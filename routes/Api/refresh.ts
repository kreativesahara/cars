import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";

const router = Router();

router.route("/")
    .post(handleRefreshToken)

export default router