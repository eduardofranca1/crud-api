import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validateSchema =
  (schema: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: request.body,
        query: request.query,
      });
      next();
    } catch (error: any) {
      response.status(400).json(error.params.label);
    }
  };

export { validateSchema };
