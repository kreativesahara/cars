import { Router } from "express";
import { handleRefreshToken } from "../../controllers/refreshTokenController";

const router = Router();

router.route("/")
    .get(handleRefreshToken)
    // .post(createTest)
    // .put(updateTest)
    // .delete(deleteTest);

export default router