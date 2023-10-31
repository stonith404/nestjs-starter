import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import AllowUnauthenticated from "../auth/decorator/unauthenticated.decorator";
import { plainToDTO, plainToDTOs } from "../common/utils/dto.util";
import { BookService } from "./book.service";
import { BookDTO } from "./dto/book.dto";
import { CreateBookDTO, UpdateBookDTO } from "./dto/mutateBook.dto";

@ApiTags("Books")
@Controller("books")
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @AllowUnauthenticated()
  async create(@Body() book: CreateBookDTO) {
    const createdBook = await this.bookService.create(book);
    return plainToDTO(BookDTO, createdBook);
  }

  @Get()
  @AllowUnauthenticated()
  async getAll() {
    const books = await this.bookService.getAll();
    return plainToDTOs(BookDTO, books);
  }

  @Get(":id")
  @AllowUnauthenticated()
  async get(@Param("id") id: string) {
    const book = await this.bookService.get(id);
    return plainToDTO(BookDTO, book);
  }

  @Get("/title/:title")
  @AllowUnauthenticated()
  async getByTitle(@Param("title") title: string) {
    const book = await this.bookService.getByTitle(title);
    return plainToDTO(BookDTO, book);
  }

  @Patch(":id")
  @AllowUnauthenticated()
  async update(@Param("id") id: string, @Body() book: UpdateBookDTO) {
    const updatedBook = await this.bookService.update(id, book);
    return plainToDTO(BookDTO, updatedBook);
  }

  @Delete(":id")
  @AllowUnauthenticated()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    await this.bookService.delete(id);
  }
}
