import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const MailtrapClientclient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Shindu",
};
