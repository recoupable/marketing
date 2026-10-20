export class RequestError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "RequestError";
    this.code = code;
    this.status = status;
  }
}
