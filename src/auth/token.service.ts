import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as moment from "moment";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async createAccessToken(user: User) {
    return this.jwtService.sign(
      {
        sub: user.id,
        iat: Date.now(),
        email: user.email,
      },
      {
        expiresIn: "15min",
      }
    );
  }

  async createRefreshToken(userId: string) {
    const { token } = await this.prisma.refreshToken.create({
      data: { userId, expiresAt: moment().add(3, "months").toDate() },
    });

    return token;
  }

  async refreshAccessToken(refreshToken: string) {
    const refreshTokenMetaData = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!refreshTokenMetaData || refreshTokenMetaData.expiresAt < new Date())
      throw new UnauthorizedException();

    return this.createAccessToken(refreshTokenMetaData.user);
  }
}
