import { Router } from "express";

const router = Router();
const { getAllProducts, getProduct } = require("../../controllers/productsController");

router.route("/")
    .get(getAllProducts)
router.route("/:id")
    .get(getProduct)

export default router;
