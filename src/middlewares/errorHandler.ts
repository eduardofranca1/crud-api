import { Request, Response, NextFunction } from "express";
import { Exception } from "../exceptions";

export const errorHandler = (
  error: Exception,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.code).json(error.message);
};
