import express from "express";
import { auth, validation } from "shared";
import { Flags } from "shared2";
import { v1 } from "../../endpoints";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/me/addresses", auth({ neededFlags: [Flags.None] }), v1.users.me.addresses.get);
router.post(
  "/me/addresses",
  auth({ neededFlags: [Flags.None] }),
  validation(v1Validators.addresses.create),
  v1.users.me.addresses.create
);

router.patch(
  "/me/addresses/:addressId",
  auth({ neededFlags: [Flags.None] }),
  validation(v1Validators.addresses.update),
  v1.users.me.addresses.update
);

router.delete(
  "/me/addresses/:addressId",
  auth({ neededFlags: [Flags.None] }),
  validation(v1Validators.addresses.remove),
  v1.users.me.addresses.remove
);

router.get("/:userId/addresses", auth({ neededFlags: [Flags.ManageUsers] }));

router.get("/me", auth({ neededFlags: [Flags.None] }), v1.users.me.get);
router.patch(
  "/me",
  auth({ neededFlags: [Flags.None] }),
  validation(v1Validators.me.update),
  v1.users.me.update
);

router.get("/me/sessions", auth({ neededFlags: [Flags.None] }), v1.users.me.sessions.getAll);
router.delete(
  "/me/sessions",
  auth({ neededFlags: [Flags.None] }),
  validation(v1Validators.sessions.remove),
  v1.users.me.sessions.remove
);

router.patch("/:userId/flags", auth({ neededFlags: [Flags.ManageUsers] }));

export { router as users };
