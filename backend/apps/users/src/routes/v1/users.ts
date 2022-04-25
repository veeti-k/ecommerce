import express from "express";
import { auth, Flags } from "shared";

const router = express.Router();

router.get("/me/addresses", auth(Flags.None));
router.post("/me/addresses", auth(Flags.None));
router.patch("/me/addresses/:addressId", auth(Flags.None));
router.delete("/me/addresses/:addressId", auth(Flags.None));

router.get("/:userId/addresses", auth(Flags.ManageUsers));

router.get("/me", auth(Flags.None));
router.patch("/me"), auth(Flags.None);

router.get("/me/sessions", auth(Flags.None));
router.delete("/me/sessions", auth(Flags.None));

router.patch("/:userId/flags", auth(Flags.ManageUsers));

export { router as users };
