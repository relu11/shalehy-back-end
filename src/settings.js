import dotenv from "dotenv";
dotenv.config();
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const databaseURL = process.env.DATABASE_URL;
export const sessionSecret = process.env.SESSION_SECRET;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
