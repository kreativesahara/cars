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