import { Router } from "express";

const router = Router();
const {getAllUsers, createUser, getUser} = require("../../controllers/usersControllers");
//const users : string= 'mwongera';

// GET /api/users
//console.log(`hello ${users} from router`)
router.route("/")
    .get(getAllUsers)
    .post(createUser)
    .put((req: any, res: any) => {
        console.log("update user : coming soon!!!");
    })
    .delete(
        (req: any, res: any) => {
            res.json({
                message: "delete user : coming soon!!!",
                //id: req.params.id
            });
        }
    );
router.route("/:id")
    .get(getUser)
//console.log(`bye${users} from router`);

export default router;