import { mailtrapClient,sender } from "./mailtrap.config.js"
import { 
    PASSWORD_RESET_REQUEST_TEMPLATE, 
    VERIFICATION_EMAIL_TEMPLATE ,
    PASSWORD_RESET_SUCCESS_TEMPLATE
    } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recepient = [
        {
            email,
        }
    ]
    try {
        const response = await mailtrapClient.send(
            {
                from : sender,
                to : recepient,
                subject : "Verify your email",
                html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                category : "Email Verification"
            }
        )
        console.log("Email Sent Successfully", response);
    } catch (error) {
        console.error(`Error sending verification Email: ${error}`);
        throw new Error(`error sending verification email: ${error}`)
    }
};
export const sendWelcomeEmail = async (email, name) => {
    const recepient = [{email}];
    try {
        const response = await mailtrapClient.send ({
            from: sender,
            to : recepient,
            template_uuid: process.env.TEMPLATE_UUID,
            // subject : `Welcome Buddy`,
            template_variables : {
                company_info : "Authorization Process",
                name,
            },
        })
        console.log("welcome email sent successfully : ",response);
    } catch (error) {
        console.error("error sending welcome email", error);
        throw new Error(`error sending welcome email:${error}`);
    }
    
 }
export const sendPasswordResetEmail = async (email,resetURL) => {
    const recepient = [{email}];
    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to : recepient,
                subject : "Reset your Password",
                html : PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetURL) ,
                category : "password reset",
            }
        )
    } catch (error) {
        console.error(`error sending reset email`,error);
        throw new Error(`Error sending reset email: ${error}`);
    }
}
export const sendResetSuccessfulEmail = async (email) => {
    const recepient = [{email}];
    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to : recepient,
                subject : " Password Rest Successful",
                html : PASSWORD_RESET_SUCCESS_TEMPLATE,
                category : "successful password reset ",
            }
        );
        console.log("password reset email sent successfully", response);
    } catch (error) {
        console.error(`error sending reset successful mail`,error);
        throw new Error(`Error sending reset successful mail: ${error}`);
    }
}