import { Router } from "express";
import {  registerUser } from "../../controllers/AuthController";
const router = Router();

router.route("/")
    .post(registerUser)
    //.get(userLogin);
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;