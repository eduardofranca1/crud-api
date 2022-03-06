import { config } from "dotenv";

config();

export const tokenSecret = process.env.TOKEN_SECRET ?? "";
