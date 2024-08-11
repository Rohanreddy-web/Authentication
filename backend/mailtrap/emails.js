import { mailtrapClient,sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

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
}