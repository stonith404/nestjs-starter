import { Expose, Type } from "class-transformer";
import { Allow, Length } from "class-validator";
import { UserDTO } from "@/user/dto/user.dto";

export class BookDTO {
  @Expose()
  id: string;

  @Expose()
  @Allow()
  @Length(1, 255)
  title: string;

  @Expose()
  @Type(() => UserDTO)
  author: UserDTO;
}
