import { PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Allow, IsUUID } from "class-validator";

export class TokenDTO {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class AccessTokenDTO extends PickType(TokenDTO, ["accessToken"]) {}

export class RefreshTokenDTO {
  @Allow()
  @Expose()
  @IsUUID()
  refreshToken: string;
}
