import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthenticatedGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowUnauthenticated = this.reflector.get<boolean>(
      "allowUnauthenticated",
      context.getHandler()
    );
    try {
      return (await super.canActivate(context)) as boolean;
    } catch {
      return allowUnauthenticated;
    }
  }
}
