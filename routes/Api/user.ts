import { Router } from "express";

const router = Router();
const {getAllUsers, createUser, getUser} = require("../../controllers/usersControllers");

router.route("/")
    .get(getAllUsers)
    .post(createUser);
router.route("/:id")
    .get(getUser)
    //.put()
    //.delete();

export default router;