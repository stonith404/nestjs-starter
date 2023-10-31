import { UserDTO } from "@/user/dto/user.dto";
import { PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordDTO extends PickType(UserDTO, ["password"]) {
  @IsString()
  oldPassword: string;
}
