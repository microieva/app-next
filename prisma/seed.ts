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
      roleId: "b4d9b335-6b7d-419e-aa50-061b80eca383"
    },
  });

  console.log("✅ User created");
  await prisma.user.create({
    data: {
      email: "admin@email.com",
      password: hashedPassword,
      firstName: "admin",
      lastName: "admin",
      roleId: "43fb73f4-314a-4d85-83b5-e18386159e7b"
    },
  });

  console.log("✅ Admin created");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
