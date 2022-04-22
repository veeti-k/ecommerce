import { createServer } from "./server";
import { prisma } from "./database";
import { config } from "./config";

await prisma.$connect();

const server = createServer();

server.listen(config.port, () => console.log(`Backend started on port ${config.port}`));
