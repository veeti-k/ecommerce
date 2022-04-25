import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.ports.auth, () =>
  console.log(`auth-api started on port ${config.ports.auth}`)
);
