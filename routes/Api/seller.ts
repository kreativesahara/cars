import { Router } from "express";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();
const { getAllSellers, createSeller, getSeller, updateSeller, deleteSeller } = require("../../controllers/sellersController");

router.route("/")
    .post(createSeller)
    .get(getAllSellers)

router.route("/:id")
    .get(getSeller)
    .put(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin), updateSeller)
    .delete(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin), deleteSeller);

export default router;