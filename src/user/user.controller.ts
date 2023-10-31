import { GetUser } from "@/auth/decorator/getUser.decorator";
import { plainToDTO } from "@/common/utils/dto.util";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { UserDTO } from "./dto/user.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  @Get("me")
  getCurrentUser(@GetUser() user: User) {
    return plainToDTO(UserDTO, user);
  }
}
