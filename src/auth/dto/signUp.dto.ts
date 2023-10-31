import { UserDTO } from "@/user/dto/user.dto";
import { OmitType } from "@nestjs/swagger";

export class SignUpDTO extends OmitType(UserDTO, ["id"] as const) {}
