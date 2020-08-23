import express from "express";
import { signinController, signupController } from "../controllers";
const authRouter = express.Router();

authRouter.post("/signin", signinController);
authRouter.post('/signup', signupController);

export default authRouter;
