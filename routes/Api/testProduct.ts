import { Router } from "express";
const router = Router();
const { 
    getAllUploads, 
    createUpload, 
    // getUpload, 
    // updateUpload, 
    // deleteUpload
} = require("../../controllers/testProductController");

router.route("/")
    .get(getAllUploads)
    .post(createUpload)
    // .put(updateUpload)
    // .delete(deleteUpload);
router.route("/:id")
    // .get(getUpload)
export default router;

//TODO: Add roles
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);