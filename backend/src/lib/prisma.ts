// Load evironment variables from .env file
require("dotenv").config();

// Import Prisma Client and Adapter
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// Create the adapter using the connection URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

// Create a new Prisma Client instance with the adapter
const prisma = new PrismaClient({ adapter });

// Export the module
module.exports = prisma;