import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("demo", 10);

  await prisma.user.create({
    data: {
      email: "user@email.com",
      password: hashedPassword,
      firstName: "user",
      lastName: "user",
      roleId: "3c9c6c51-7683-4f49-8ac5-6f5e150472d9"
    },
  });

  console.log("✅ Admin created");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
