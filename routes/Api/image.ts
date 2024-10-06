import { Router } from "express";

const router = Router();
const { uploadImage, gellAllImage} = require("../../controllers/imagesController");

router.route("/")
    .get(gellAllImage)
    .post(uploadImage);
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;