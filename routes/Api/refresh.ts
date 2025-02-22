import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();

router.route("/")
    .post(verifyRoles(ROLES_LIST.Visitor,ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),handleRefreshToken)

export default router