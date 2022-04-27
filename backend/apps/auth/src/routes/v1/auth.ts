import express from "express";
import { validation } from "shared";
import { v1 } from "../../endpoints";
import { v1Validators } from "../../validators/v1";

const router = express.Router();

router.post("/verify", v1.auth.verify);
router.post("/register", validation(v1Validators.register), v1.auth.register);
router.post("/login", validation(v1Validators.login), v1.auth.login);

router.get("/tokens", v1.auth.tokens);

export { router as auth };
