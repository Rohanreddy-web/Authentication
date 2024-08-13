import  express  from "express";
import { LogIn, logOut, signUp, verifyMail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signUp)
router.post("/logout",logOut)
router.post("/login",LogIn)

router.post("/verify-mail",verifyMail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;