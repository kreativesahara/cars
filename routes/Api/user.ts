import { Router } from "express";

const router = Router();
const {getAllUsers, createUser, getUser} = require("../../controllers/usersControllers");

router.route("/")
    .get(getAllUsers)
    .post(createUser)
    .put()
    .delete();
    
router.route("/:id")
    .get(getUser)

export default router;