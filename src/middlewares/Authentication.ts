import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { tokenSecret } from "../config";

export default function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json("Unauthorized.");
  }

  try {
    verify(authToken, tokenSecret);
    return next();
  } catch (error) {
    return response.status(401).json("Unauthorized.");
  }
}
