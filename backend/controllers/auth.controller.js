import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.util.js";
import { 
    sendVerificationEmail, 
    sendWelcomeEmail, 
    sendPasswordResetEmail,
    sendResetSuccessfulEmail 
    } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";


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
export const verifyEmail = async (req,res) => {
    // 123456 six digit code
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt : { $gt : Date.now()} // still valide coe not expired
        });
        if(!user){
            return res
            .status(400)
            .json(
                {
                    success: false,
                    message: "invalid user or verification code expired",
                }
            ) 
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json(
            {
                success: true,
                message : `Email Verified successfully`,
                user: {
                    ...user._doc,
                    password: undefined
                }
            }
        )
    } catch (error) {
        console.error("error in verifying Email",error);
        res
        .status(500).json(
            {
                    success: false,
                    message: "Server Error",
            },
            
        );
    }
    
}
export const logOut = (req,res) =>{
    res.clearCookie("token");
    res
    .status(200)
    .json(
        {
            success:true,
            message : "logged out successfully"
        }
    )
}
export const LogIn = async (req,res) =>{
    const {email , password} = req.body;

   try {
    const user = await User.findOne({email});
    if(!user){
        res.status(400).json(
            {
                success: false,
                message: "invalid credientials",
            }
        )
    }
    const isPasswordValid = await bcryptjs.compare(password , user.password); // ui password compared with database password
    if(!isPasswordValid){
        res.status(400).json(
            {
                success: false,
                message: "invalid password",
            }
        )
    }
    await generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json(
        {
            success: true,
            message : `loggedIn successfully`,
            user: {
                ...user._doc,
                password: undefined
            }
        }
    )
     
   } catch (error) {
    res.status(400).json(
        console.error("error in login ", error),
        {
            success:false,
            message: error.message,
        }
    )
   }
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user don't exist",
            })
        }

        //generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 10000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        //send email
        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json(
            {
                success: true,
                message  :"password reset link sent to your mail"
            }
        )
    } catch (error) {
        console.error("error in forgot password", error);
        res.status(400).json(
            {
                success: false,
                message: error.message,
            }
        )
        
    }
}
export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne( 
            {
                resetPasswordToken  : token,
                resetPasswordExpiresAt : {
                    $gt : Date.now()
                }
            }
        )
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid or Expired reset Token",
            })
        }

        //update password
        const hashedPassword = await bcryptjs.hash(password,10);
        user.password  = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        //send email
        await sendResetSuccessfulEmail(user.email)
        res.status(200).json(
            {
                success: true,
                message  :"password 'reset successful' sent to your mail"
            }
        )
    } catch (error) {
        console.error("error in sending password reset successful mail", error);
        res.status(400).json(
            {
                success: false,
                message: error.message,
            }
        )
        
    }
}

export const checkAuth = async (req,res) => {
   try {
     const user = await User.findById(req.userId).select(" -password ");
     if(!user){
        return res.status(400).json({success:false,message:"user not found"})
     }
     res.status(200).json({success: true, user});
   } catch (error) {
        console.error("error in CheckAuth",error);
        res.status(400).json({success: false, message: error.message})
   }
}