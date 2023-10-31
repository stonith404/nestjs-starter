import { PrismaClient } from "@prisma/client";
import seedData from "./seedData";

async function seedBooks(prisma: PrismaClient) {
  for (const book of seedData.books) {
    await prisma.book.upsert({
      create: book,
      update: {},
      where: { id: book.id },
    });
  }
}

export async function seedDev(prisma: PrismaClient) {
  await seedBooks(prisma);
}
