import express from "express";
import { validation } from "shared";
import { validationSchemas } from "shared2";
import { auth } from "../endpoints";

const router = express.Router();

router.post("/verify", auth.verify);
router.post("/register", validation(validationSchemas.register), auth.register);
router.post("/login", validation(validationSchemas.login), auth.login);

router.get("/tokens", auth.tokens);

export { router as auth };
