import { Callback, Context } from "aws-lambda";
import { DomainError } from "../../../domain/error/DomainError";
import { IllegalArgumentException } from "../../../shared/errors/IllegalArgumentException";
import { logger } from "../../../shared/logger/logger";

function makeResponse(message: unknown, statusCode: number) {
  return {
    statusCode,
    body: JSON.stringify(message),
  };
}

export const httpMiddleware =
  <E = unknown, R = unknown, C extends Context = Context>(
    handler: (event: E, context: C, ctx: Callback) => Promise<R>,
    successCode?: number
  ) =>
  async (event: E, context: C, ctx: Callback) => {
    logger.info({ event }, "Started lambda execution");

    try {
      const result = await handler(event, context, ctx);

      return makeResponse(result, successCode || 200);
    } catch (err) {
      if (
        err instanceof DomainError ||
        err instanceof IllegalArgumentException
      ) {
        logger.info({ event }, "400 error while executing lambda");

        return makeResponse(err.message, 400);
      }

      logger.error({ err }, "Error while executing lambda");
      return makeResponse("Internal server error", 500);
    }
  };
