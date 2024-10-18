import express from "express"
import { loginValidation, signupValidation } from "../Middlewares/authValidation.js";
import { login, signup } from "../Controllers/authController.js";

const router = express.Router();

// Login Router
router.post("/login",loginValidation, login)

// Signup Router
router.post("/signup",signupValidation , signup)



export default router;

