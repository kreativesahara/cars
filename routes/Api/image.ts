import { Router } from "express";

const router = Router();
const { uploadImage, gellAllImage} = require("../../controllers/imagesController");


// GET /api/products
router.route("/")
    .get(gellAllImage)
    .post(uploadImage);
export default router;