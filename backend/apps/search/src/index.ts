import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.ports.search, () =>
  console.log(`search started on port ${config.ports.search}`)
);
