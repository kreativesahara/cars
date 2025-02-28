import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();

router.route("/")
    .get(handleRefreshToken)

export default router