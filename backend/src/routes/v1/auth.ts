import express from "express";
import { v1 } from "../../endpoints";

const router = express.Router();

router.post("/register", v1.auth.register);
router.post("/login", v1.auth.login);

export { router as auth };
