import { HttpStatus } from "./HttpStatus";

class CustomException extends Error {
  code: HttpStatus;

  constructor(message: string, code: HttpStatus) {
    super(message);
    this.code = code;
  }
}

export default CustomException;
