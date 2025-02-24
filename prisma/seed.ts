import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("demo", 10);

  await prisma.user.create({
    data: {
      email: "test@email.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Test user created!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
