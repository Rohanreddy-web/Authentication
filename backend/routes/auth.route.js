import  express  from "express";
import { LogIn, logOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signUp)
router.post("/logout",logOut)
router.post("/login",LogIn)

export default router;