import { Router } from "express";

const router = Router();
const { getAllSellers, createUser, getUser, updateUser, deleteUser } = require("../../controllers/sellersController");

router.route("/")
    .get(getAllSellers)
    // .post(createUser)
    // .put(updateUser)
    // .delete(deleteUser);

router.route("/:id")
    // .get(getUser)

export default router;