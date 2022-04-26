import express from "express";
import { auth, Flags } from "shared";
import { v1 } from "../../endpoints";

const router = express.Router();

router.get("/me/addresses", auth(Flags.None), v1.users.me.addresses.get);
router.post("/me/addresses", auth(Flags.None));
router.patch("/me/addresses/:addressId", auth(Flags.None));
router.delete("/me/addresses/:addressId", auth(Flags.None));

router.get("/:userId/addresses", auth(Flags.ManageUsers));

router.get("/me", auth(Flags.None), v1.users.me.get);
router.patch("/me", auth(Flags.None), v1.users.me.update);

router.get("/me/sessions", auth(Flags.None), v1.users.me.sessions.getAll);
router.delete("/me/sessions", auth(Flags.None), v1.users.me.sessions.remove);

router.patch("/:userId/flags", auth(Flags.ManageUsers));

export { router as users };
