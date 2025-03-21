import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";

const router = Router();

router.route("/")
    .get(handleRefreshToken)

export default router