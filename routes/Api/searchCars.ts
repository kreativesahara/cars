import { Router } from "express";
import { ROLES_LIST } from "../../config/roles_list";
import { verifyRoles } from "../../middleware/verifyRoles";
import { searchCarProduct } from "../../controllers/searchController";
const router = Router();
router.route("/")
    .get(searchCarProduct)

export default router;