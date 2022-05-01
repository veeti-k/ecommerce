import { createServer } from "./server";
import { config } from "config";

const server = createServer();

server.listen(config.ports.ugc, () => console.log(`ugc-api started on port ${config.ports.ugc}`));
