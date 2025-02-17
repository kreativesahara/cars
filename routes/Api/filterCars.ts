import { Router } from "express";
import { filterCarProducts } from "../../controllers/filterController";

const router = Router();

router.route("/")
    .get(filterCarProducts)

export default router;
