import { config } from "config";
import { UsersClient } from "shared";

let prisma = new UsersClient({ datasources: { db: { url: config.dbUrls.users } } });

export default prisma;
