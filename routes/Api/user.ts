import { Router } from "express";

const router = Router();
const {getAllUsers, createUser} = require("../../controllers/usersControllers");
//const users : string= 'mwongera';

// GET /api/users
//console.log(`hello ${users} from router`)
router.route("/")
    .get(getAllUsers)
    .post(createUser);
//console.log(`bye${users} from router`);

export default router;