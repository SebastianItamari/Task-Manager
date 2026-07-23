require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash("contraseñaDePrueba999", 10);

  const user = await prisma.user.upsert({
    where: { email: "seed-user@example.com" },
    update: {},
    create: {
      email: "seed-user@example.com",
      password: hashed,
    },
  });

  const existingTask = await prisma.task.findFirst({
    where: { userId: user.id, title: "Tarea de ejemplo para pruebas" },
  });

  if (!existingTask) {
    await prisma.task.create({
      data: {
        title: "Tarea de ejemplo para pruebas",
        completed: false,
        userId: user.id,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
