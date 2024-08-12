import  express  from "express";
import { LogIn, logOut, signUp, verifyMail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signUp)
router.post("/logout",logOut)
router.post("/login",LogIn)

router.post("/verify-mail",verifyMail)

export default router;