import { PrismaService } from "@/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
