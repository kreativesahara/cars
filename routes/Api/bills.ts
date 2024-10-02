import {Router} from  "express";
const router = Router();
const billsController = require("../../controllers/billsControllers")
const bill: number= 3000;

router.route('/')
    .get(billsController.getAllBills)
router.get('/', (req, res) => {
    res.status(200).send(`Current balance: ${bill}`);
})

export default router