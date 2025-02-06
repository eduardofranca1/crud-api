import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

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
  (schema: ZodSchema<any>, requestType: "body" | "params" | "query") =>
  async (request: Request, response: Response, next: NextFunction) => {
    console.log("🚀 ~ request:", request.body);
    console.log(requestType);
    try {
      console.log("aqui");
      switch (requestType) {
        case "body":
          console.log("aqui 2");
          await schema.parseAsync(request.body);
          break;
        case "params":
          console.log("aqui 3");
          await schema.parseAsync(request.params);
          break;
        case "query":
          console.log("aqui 4");
          await schema.parseAsync(request.query);
          break;
      }
      console.log("aqui 5");
      next();
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      response.status(400).json(handleErrors(error.errors));
    }
  };
