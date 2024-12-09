import {verifyRoles} from "../../middleware/verifyRoles";
import { ROLES_LIST } from "../../config/roles_list";
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
    .get(verifyRoles(ROLES_LIST.Visitor,ROLES_LIST.Member,ROLES_LIST.Seller,ROLES_LIST.Modarator,ROLES_LIST.Admin), getAllUploads)
    .post(createUpload)
    // .put(updateUpload)
    // .delete(deleteUpload);
router.route("/:id")
    // .get(getUpload)
export default router;
