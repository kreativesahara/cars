import { Router } from "express";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();
const { getAllProducts, getProduct, createProduct, updateSingleProduct,deleteProduct } = require("../../controllers/productsController");

router.route("/")
    .get(verifyRoles(ROLES_LIST.Visitor,ROLES_LIST.Member,ROLES_LIST.Seller,ROLES_LIST.Modarator,ROLES_LIST.Admin),getAllProducts)
    .post(createProduct)
    // .put(updateSingleProduct)
    // .delete(deleteProduct);
// router.route("/:id")
//     .get(getProduct)
export default router;

//TODO: Add roles
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);