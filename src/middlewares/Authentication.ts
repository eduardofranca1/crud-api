import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { tokenSecret } from "../config";

export const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    return response.status(401).json("Unauthorized.");
  }

  const token = request.headers.authorization.split(" ")[1];
  console.log("🚀 ~ token:", token);

  if (!token) {
    return response.status(401).json("Unauthorized.");
  }

  try {
    verify(token, tokenSecret, (error, userId) => {
      response.locals.userId = userId;
    });
    return next();
  } catch (error) {
    return response.status(401).json("Unauthorized.");
  }
};
