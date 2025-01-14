import { HttpStatus } from "./httpStatus";

class Exception extends Error {
  code: HttpStatus;

  constructor(message: string, code: HttpStatus) {
    super(message);
    this.code = code ?? 500;
    this.message = message ?? "Error";
  }
}

export default Exception;
