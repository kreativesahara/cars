import { Router } from "express";

const router = Router();
const { uploadImage, getAllImage} = require("../../controllers/imagesController");

router.route("/")
    .get(getAllImage)
    .post(uploadImage);
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;