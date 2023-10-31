import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect()
      .then(() => this.logger.log("Connected to database"))
      .catch((e) => {
        this.logger.error(e);
        process.exit(1);
      });

    this.addExtensions();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  private addExtensions() {
    Object.assign(
      this,
      this.$extends({
        query: {
          async $allOperations({ model, args, query }) {
            const result = await query(args).catch((e) => {
              e.meta.model = model;
              throw e;
            });
            return result;
          },
        },
      })
    );
  }
}
