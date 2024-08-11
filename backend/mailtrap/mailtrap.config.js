// const { MailtrapClient } = require("mailtrap"); // common js
import { MailtrapClient } from "mailtrap"; // module js
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "VARA",
};
// const recipients = [
//   {
//     email: process.env.MAILTRAP_MY_MAIL,
//   }
// ]; its gonna be dynamic not single

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",// html to modify it more elegently pic, bold, etc etc
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);