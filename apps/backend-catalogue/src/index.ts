import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.ports.catalogue, () =>
  console.log(`catalogue-api started on port ${config.ports.catalogue}`)
);
