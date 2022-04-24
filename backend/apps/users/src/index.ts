import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.port, () => console.log(`users-api started on port ${config.port}`));
