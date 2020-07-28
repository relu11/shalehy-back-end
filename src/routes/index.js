import express from "express";
import { indexPage, usersPage } from "../controllers";
const indexRouter = express.Router();

indexRouter.get("/", indexPage);
indexRouter.get('/users', usersPage);

export default indexRouter;
