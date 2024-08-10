import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type : String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true,
            
        },
        user : {
            type: String,
            required : true
        },
        lastLogin: {
            type: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpiredAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    {timestamps: true} // createdAt & updatedAt fields are auto added to documents
    );

    export const User = mongoose.model('User', userSchema);