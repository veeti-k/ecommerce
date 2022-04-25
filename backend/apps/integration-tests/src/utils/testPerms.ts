import { Method } from "axios";
import { Flags, SeededUsers, seededUsers } from "shared";
import { TestClient } from "./misc";

export const testPerms = async (url: string, method: Method, ...shouldHaveAccess: bigint[]) => {
  const hadAccess: bigint[] = [];
  let runs = 0;

  const client = new TestClient();

  for (const username in seededUsers) {
    const user = seededUsers[username];

    await client.loginAs[username as SeededUsers]();

    const res = await client.withConfig({
      method,
      url,
    });

    await client.logout();

    if (res?.status !== 401 && res?.status !== 403) hadAccess.push(BigInt(user.flags));

    runs++;
  }

  if (!shouldHaveAccess.includes(Flags.Admin)) shouldHaveAccess.push(Flags.Admin);

  if (shouldHaveAccess.includes(Flags.None)) expect(hadAccess.length).toBe(runs);

  const illegallyHadAccess = hadAccess.filter((flag) => !shouldHaveAccess.includes(flag));
  const shouldHadAccess = shouldHaveAccess.filter((flag) => !hadAccess.includes(flag));

  if (illegallyHadAccess.length)
    throw new Error(`User(s) with flags ${illegallyHadAccess.join(", ")} illegally had access`);

  if (shouldHadAccess.length)
    throw new Error(`User(s) with flags ${shouldHadAccess.join(", ")} should have had access`);
};
