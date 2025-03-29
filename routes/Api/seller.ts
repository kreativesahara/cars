import { Router } from "express";
const { getAllSellers, createSeller, getSeller, updateSeller, deleteSeller } = require("../../controllers/sellersController");
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";

const router = Router();

router.route("/")
    .post(createSeller)
    .get(getAllSellers)

router.route("/:id")
    .get(getSeller)
    .put(updateSeller)
    .delete(deleteSeller);

export default router;