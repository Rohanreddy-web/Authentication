import  express  from "express";
import { Login, logOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup",signUp)
router.get("/logOut",logOut)
router.get("/login",Login)

export default router;