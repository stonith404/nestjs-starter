import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDTO {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
