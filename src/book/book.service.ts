import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateBookDTO, UpdateBookDTO } from "./dto/mutateBook.dto";

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(book: CreateBookDTO) {
    return await this.prisma.book.create({
      data: book,
    });
  }

  async get(id: string) {
    return this.prisma.book.findUnique({
      include: {
        author: true,
      },
      where: {
        id,
      },
    });
  }

  async getAll() {
    return this.prisma.book.findMany({
      include: {
        author: true,
      },
    });
  }

  async getByTitle(title: string) {
    return this.prisma.book.findUnique({
      include: {
        author: true,
      },
      where: {
        title,
      },
    });
  }

  async update(id: string, book: UpdateBookDTO) {
    return await this.prisma.book.update({
      data: book,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
