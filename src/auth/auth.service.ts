import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { SignInDTO } from "./dto/signIn.dto";
import { SignUpDTO } from "./dto/signUp.dto";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async signUp(data: SignUpDTO): Promise<User | null> {
    const passwordHash = await argon.hash(data.password);
    data.email = data.email.toLowerCase();

    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: passwordHash,
        },
      });

      this.logger.log(`Created user with email ${data.email}`);
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException("User with this email already exists");
      } else throw e;
    }
  }

  async signIn({ email, password }: SignInDTO) {
    email = email.toLowerCase();

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await argon.verify(user.password, password)))
      throw new UnauthorizedException("Wrong email or password");

    const accessToken = await this.tokenService.createAccessToken(user);
    const refreshToken = await this.tokenService.createRefreshToken(user.id);

    this.logger.log(`User ${user.id} logged in`);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
  }

  async updatePassword(user: User, oldPassword: string, newPassword: string) {
    if (!(await argon.verify(user.password, oldPassword)))
      throw new ForbiddenException("Invalid password");

    const hash = await argon.hash(newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hash },
    });

    return this.tokenService.createAccessToken(user);
  }
}
