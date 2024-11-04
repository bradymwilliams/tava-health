import { prisma } from "../server/db";
import { data as employeeData } from "./seed-data/employees.ts";

async function seed() {
  await prisma.employee.createMany({
    data: employeeData,
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
