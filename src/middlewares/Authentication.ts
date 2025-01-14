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

  if (!token) {
    return response.status(401).json("Unauthorized.");
  }

  try {
    verify(token, tokenSecret, (error, userId) => {
      if (error) {
        return response.status(401).json("Unauthorized.");
      } else {
        response.locals.userId = userId;
        next();
      }
    });
  } catch (error) {
    response.status(401).json("Unauthorized.");
  }
};
