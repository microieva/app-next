import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("demo", 10);

  await prisma.user.create({
    data: {
      email: "admin@email.com",
      password: hashedPassword,
      firstName: "admin",
      lastName: "Admin",
      roleId: "4c6b33c1-b196-4457-b2f2-391fd999a10d"
    },
  });

  console.log("✅ Admin created");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
