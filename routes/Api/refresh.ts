import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();

router.route("/")
    .get(verifyRoles(ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),handleRefreshToken)

export default router