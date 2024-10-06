import { Router } from "express";
import {  registerUser } from "../../controllers/AuthController";
const router = Router();

router.route("/")
    .get(registerUser)
    //.post(createUser);
router.route("/:id")
    .get()
    .put()
    .delete();
export default router;