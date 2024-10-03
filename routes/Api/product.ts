import { Router } from "express";

const router = Router();
const { getAllProducts, createProduct } = require("../../controllers/productsControllers");


// GET /api/products
router.route("/")
    .get(getAllProducts)
    .post(createProduct);

export default router;