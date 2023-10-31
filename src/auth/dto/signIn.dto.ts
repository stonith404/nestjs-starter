import { UserDTO } from "@/user/dto/user.dto";
import { PickType } from "@nestjs/swagger";

export class SignInDTO extends PickType(UserDTO, ["email", "password"]) {}
