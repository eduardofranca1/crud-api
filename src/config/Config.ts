import { config } from "dotenv";

config();

export const mongodb = process.env.MONGODB as string;

export const mongodbTest = process.env.MONGODB_TEST as string;

export const tokenSecret = process.env.TOKEN_SECRET as string;
