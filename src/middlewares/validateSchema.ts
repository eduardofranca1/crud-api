import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodSchema } from "zod";

type ErrorZod = {
  message: string;
  path: string[];
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
};

type HandleErrors = {
  message: string;
  path: string[];
};

const handleErrors = (errorsZod: ErrorZod[]) => {
  const errors: HandleErrors[] = [];

  errorsZod.forEach((error) => {
    errors.push({
      message: error.message,
      path: error.path,
    });
  });

  return errors;
};

export const validateSchema =
  (schema: ZodSchema<any>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      switch (request.method) {
        case "GET":
        case "DELETE":
          await schema.parseAsync(request.query);
          break;
        case "POST":
        case "PUT":
          await schema.parseAsync(request.body);
          break;
      }
      next();
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      response.status(400).json(handleErrors(error.errors));
    }
  };
