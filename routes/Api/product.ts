import { Router } from "express";

const router = Router();
const { getAllProducts, createProduct } = require("../../controllers/productsControllers");

router.route("/")
    .get(getAllProducts)
    .post(createProduct)
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;

//TODO: Add roles
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);