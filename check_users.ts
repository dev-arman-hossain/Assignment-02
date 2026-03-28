import { prisma } from "./src/lib/prisma.js";

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
  });
  console.log("Current Users in DB:");
  console.dir(users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
