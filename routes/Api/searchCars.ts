import { Router } from "express";
import { searchCarProduct } from "../../controllers/searchController";

const router = Router();

router.route("/")
    .get(searchCarProduct)

export default router;