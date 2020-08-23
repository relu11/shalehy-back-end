import supertest from "supertest";
import chai from "chai";
import sinonChai from "sinon-chai";
import dotenv from "dotenv";
import app from "../src/app";

dotenv.config();

chai.use(sinonChai);
export const { expect } = chai;
export const server = supertest.agent(app);
export const BASE_URL = "";
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
