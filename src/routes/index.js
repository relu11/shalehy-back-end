import express from "express";
import { indexPage, usersPage, authenticationController } from "../controllers";

const indexRouter = express.Router();

indexRouter.get("/", indexPage);

export default indexRouter;
