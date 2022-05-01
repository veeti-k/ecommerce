import { config } from "config";
import { CatalogueClient } from "shared";

let prisma = new CatalogueClient({ datasources: { db: { url: config.dbUrls.catalogue } } });

export default prisma;
