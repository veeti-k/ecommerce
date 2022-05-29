import express from "express";
import { auth, validation } from "shared";
import { Flags, validationSchemas } from "shared2";
import { users } from "../endpoints";

const router = express.Router();

router.get("/me/addresses", auth({ neededFlags: [Flags.None] }), users.me.addresses.get);
router.post(
  "/me/addresses",
  auth({ neededFlags: [Flags.None] }),
  validation(validationSchemas.createAddress),
  users.me.addresses.create
);

router.patch(
  "/me/addresses/:addressId",
  auth({ neededFlags: [Flags.None] }),
  validation(validationSchemas.updateAddress),
  users.me.addresses.update
);

router.delete(
  "/me/addresses/:addressId",
  auth({ neededFlags: [Flags.None] }),
  users.me.addresses.remove
);

router.get("/:userId/addresses", auth({ neededFlags: [Flags.ManageUsers] }));

router.get("/me", auth({ neededFlags: [Flags.None] }), users.me.get);
router.patch(
  "/me",
  auth({ neededFlags: [Flags.None] }),
  validation(validationSchemas.updateMe),
  users.me.update
);

router.get("/me/sessions", auth({ neededFlags: [Flags.None] }), users.me.sessions.getAll);
router.delete("/me/sessions", auth({ neededFlags: [Flags.None] }), users.me.sessions.remove);

router.patch("/:userId/flags", auth({ neededFlags: [Flags.ManageUsers] }));

export { router as users };
