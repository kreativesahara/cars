import { Router } from "express";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();
const { getAllProducts, getProduct, createProduct, updateUpload, deleteUpload } = require("../../controllers/productsController");

router.route("/")
    .get(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin) ,getAllProducts)
    .post(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin), createProduct)
router.route("/:slug")
    .get(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin),getProduct)
    .put(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin), updateUpload)
    .delete(verifyRoles(ROLES_LIST.Visitor, ROLES_LIST.Member, ROLES_LIST.Seller, ROLES_LIST.Modarator, ROLES_LIST.Admin), deleteUpload);

export default router;
