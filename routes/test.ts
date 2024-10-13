import { Router }  from "express";
const router = Router();
const { getAllTests, createTest, getTest, updateTest, deleteTest }  =require("../controllers/testController");

router.route("/")
    .get(getAllTests)
    .post(createTest)
    .put(updateTest)
    .delete(deleteTest);

router.route("/:id")
    .get(getTest)
    
export default router