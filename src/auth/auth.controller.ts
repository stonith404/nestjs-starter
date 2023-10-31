import { UserDTO } from "@/user/dto/user.dto";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { User } from "@prisma/client";
import { plainToDTO } from "@utils/dto.util";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorator/getUser.decorator";
import AllowUnauthenticated from "./decorator/unauthenticated.decorator";
import { SignInDTO } from "./dto/signIn.dto";
import { SignUpDTO } from "./dto/signUp.dto";
import { AccessTokenDTO, RefreshTokenDTO, TokenDTO } from "./dto/token.dto";
import { UpdatePasswordDTO } from "./dto/updatePassword.dto";
import { TokenService } from "./token.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Post("sign-up")
  @AllowUnauthenticated()
  async signUp(@Body() data: SignUpDTO) {
    const user = await this.authService.signUp(data);
    return plainToDTO(UserDTO, user);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @AllowUnauthenticated()
  @Throttle({ default: { limit: 5, ttl: 15 * 60 * 1000 } })
  async signIn(@Body() data: SignInDTO) {
    const tokens = await this.authService.signIn(data);
    return plainToDTO(TokenDTO, tokens);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @AllowUnauthenticated()
  async refreshAccessToken(@Body() { refreshToken }: RefreshTokenDTO) {
    const accessToken =
      await this.tokenService.refreshAccessToken(refreshToken);
    return plainToDTO(AccessTokenDTO, { accessToken });
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() { refreshToken }: RefreshTokenDTO) {
    await this.authService.logout(refreshToken);
  }

  @Patch("password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePassword(@GetUser() user: User, @Body() data: UpdatePasswordDTO) {
    const accessToken = await this.authService.updatePassword(
      user,
      data.oldPassword,
      data.password
    );
    return plainToDTO(TokenDTO, { accessToken });
  }
}
