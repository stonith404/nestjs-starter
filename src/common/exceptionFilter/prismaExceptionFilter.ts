import {
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  errors = {
    P2002: {
      status: 409,
      message: (meta: Record<string, string>) =>
        `A ${meta.model.toLowerCase()} with this ${meta.target} already exists`,
    },
    P2003: {
      status: 400,
      message: (meta: Record<string, string>) =>
        `Foreign key of ${meta.model.toLowerCase()} failed on the field ${
          meta.field_name.match(/(?<=_)[a-zA-Z]+(?=_)/)[0]
        }`,
    },
    P2025: {
      status: 404,
      message: (meta: Record<string, string>) =>
        `The requested ${meta.model.toLowerCase()} was not found`,
    },
  };

  catch(exception: Prisma.PrismaClientKnownRequestError) {
    if (exception.code in this.errors) {
      throw new HttpException(
        {
          statusCode: this.errors[exception.code].status,
          message: this.errors[exception.code].message(exception.meta),
          model: exception.meta.model,
        },
        this.errors[exception.code].status
      );
    } else {
      this.logger.error(exception);
      throw new InternalServerErrorException();
    }
  }
}
