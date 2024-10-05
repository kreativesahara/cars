import { Router } from "express";
import { handleLogin } from "../../controllers/AuthController";
const router = Router();

//const users : string= 'mwongera';

// GET /api/users
router.route("/")
    .get(handleLogin)
    //.post(createUser);

export default router;