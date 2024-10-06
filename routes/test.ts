const express = require("express");
const router = express.Router();
const { getAllTests, createTest, getTest }  =require("../controllers/testController");

router.route("/")
    .get(getAllTests)
    .post(createTest);
router.route("/:id")
    .get(getTest)
    //.put()
    //.delete();
export default router