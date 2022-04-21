import { createServer } from "./server";
import { config } from "config";
import { prisma } from "./database";

prisma.$connect();

const server = createServer();

server.listen(config.port, () => console.log(`Backend started on port ${config.port}`));
