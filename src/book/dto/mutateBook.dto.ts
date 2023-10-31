import { OmitType, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Allow, IsUUID } from "class-validator";
import { BookDTO } from "./book.dto";

export class CreateBookDTO extends OmitType(BookDTO, ["id", "author"]) {
  @Expose()
  @Allow()
  @IsUUID()
  authorId: string;
}

export class UpdateBookDTO extends PartialType(CreateBookDTO) {}
