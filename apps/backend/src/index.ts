import { createServer } from "./server";
import { prisma } from "./database";

prisma.$connect();

const server = createServer();

server.listen(process.env.PORT, () => console.log(`Backend started on port ${process.env.PORT}`));
