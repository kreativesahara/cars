import { Router } from "express";

const router = Router();
const {getAllUsers, createUser, getUser, updateUser, deleteUser} = require("../../controllers/usersControllers");

router.route("/")
    .get(getAllUsers)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);
    
router.route("/:id")
    .get(getUser)

export default router;