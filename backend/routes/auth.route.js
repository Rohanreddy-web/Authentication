import  express  from "express";
import { LogIn, logOut, signUp, verifyMail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth",verifyToken, checkAuth)//adding a middleware to check the author is verified or not

router.post("/signup",signUp)
router.post("/logout",logOut)
router.post("/login",LogIn)

router.post("/verify-mail",verifyMail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;