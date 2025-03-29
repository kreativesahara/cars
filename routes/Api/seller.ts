import { Router } from "express";
const { getAllSellers, createSeller, getSeller, updateSeller, deleteSeller } = require("../../controllers/sellersController");
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();

router.route("/")
    .post(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),createSeller)
    .get(getAllSellers)

router.route("/:id")
    .get(getSeller)
    .put(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),updateSeller)
    .delete(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),deleteSeller);

export default router;