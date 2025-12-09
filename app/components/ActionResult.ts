import { ZodError } from "zod";

type ActionResult<T> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      message: string;
      cause?: any;
    };

export default ActionResult;

export function prettifyZodErrorMessage(error: ZodError<any>): string {
  return error.issues.map((issue) => issue.message).join(", ");
}
