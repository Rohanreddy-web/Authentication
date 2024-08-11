import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.util.js";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "../mailtrap/emails.js";


export const signUp = async (req,res) =>{
    //res.send("SignUp route");
    const {email, password,  name} = req.body;

    try {
        if(!email || !password || !name){
            throw new Error("All fields are Required");
        }

        const userAlreadyExists = await User.findOne({email});
        //console.log("userAlreadyExists", userAlreadyExists);
        
        if(userAlreadyExists){
            return res
            .status(400)
            .json(
                {
                    success: false,
                    message: `User already exists`
                }
            );
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random()* 900000).toString();

        const user = new User(
            {
                email,
                password: hashedPassword,
                name,
                verificationToken,
                verificationTokenExpiresAt: Date.now()+ 24*60*60*1000//24hours
            }
        )
        await user.save(); // save to DB

        //jwt
        generateTokenAndSetCookie(res,user._id);
        
        await sendVerificationEmail(user.email, verificationToken);
        
        res
        .status(201)
        .json(
            {
                success: true,
                message : `User created successfully`,
                user: {
                    ...user._doc,
                    password: undefined
                }
            }
        )
    } catch (error) {
        res
        .status(400).json(
            {
                success: false,
                message: error.message,
            }
        );
    }
};
export const logOut = (req,res) =>{
    res.send("logOut route");}
export const LogIn = (req,res) =>{
    res.send("LogIn route");}