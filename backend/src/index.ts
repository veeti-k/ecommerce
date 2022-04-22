import { createServer } from "./server";
import { prisma } from "./database";
import { seedUsers } from "./seed";
import { config } from "./config";

await prisma.$connect();

await seedUsers();

const server = createServer();

server.listen(config.port, () => console.log(`Backend started on port ${config.port}`));
