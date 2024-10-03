import { Router } from "express";

const router = Router();
const { getAllProducts, createProduct } = require("../../controllers/productsControllers");
//const users : string= 'mwongera';

// GET /api/users
//console.log(`hello ${users} from router`)
router.route("/")
    .get(getAllProducts)
    //.post(createProduct);
//console.log(`bye${users} from router`);

export default router;