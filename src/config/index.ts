import { config } from "dotenv";

config();

export const mongodb = process.env.MONGODB ?? "";
export const tokenSecret = process.env.TOKEN_SECRET ?? "";
