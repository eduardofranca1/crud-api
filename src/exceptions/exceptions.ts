import { HttpEnumStatusCode } from "./http-status";

class Exception extends Error {
  private readonly code: HttpEnumStatusCode;

  constructor(message: string, code: HttpEnumStatusCode) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, Exception.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default Exception;
