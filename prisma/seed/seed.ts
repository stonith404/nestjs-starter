import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
import { seedDev } from "./dev.seed";
import seedData from "./seedData";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function seedUser() {
  await prisma.user.upsert({
    create: {
      ...seedData.user,
      password: await argon.hash(seedData.user.password),
    },
    update: {},
    where: { email: seedData.user.email },
  });
}

(async () => {
  await seedUser();
  if (process.env.NODE_ENV === "development") {
    await seedDev(prisma);
  }
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
