import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.ports.users, () =>
  console.log(`users-api started on port ${config.ports.users}`)
);
