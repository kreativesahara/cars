import { Router } from "express";


const router = Router();
const { getAllProducts, getProduct, createProduct, updateSingleProduct,deleteProduct } = require("../../controllers/productsControllers");

router.route("/")
    .get(getAllProducts)
    .post(createProduct)
    .put(updateSingleProduct)
    .delete(deleteProduct);
router.route("/:id")
    .get(getProduct)
export default router;

//TODO: Add roles
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);