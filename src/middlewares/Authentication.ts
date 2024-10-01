import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { tokenSecret } from "../config/Config";

export function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.headers.authorization) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const token = request.headers.authorization!.split(" ")[1];

  if (!token) {
    return response.status(401).json("Unauthorized.");
  }

  try {
    verify(token, tokenSecret, (error, idUser) => {
      console.log("🚀 ~ verify ~ idUser:", idUser);
      response.locals.idUser = idUser;
    });
    return next();
  } catch (error) {
    return response.status(401).json("Unauthorized.");
  }
}
