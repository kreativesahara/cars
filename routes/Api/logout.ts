import { Router } from "express";
import { handleLogout } from "../../controllers/logoutController";

const router = Router();

router.route("/")
    .get(handleLogout)

export default router