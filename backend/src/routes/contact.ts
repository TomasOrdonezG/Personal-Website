import express, { Request } from "express";
import nodemailer from "nodemailer";
import { ContactEmailInfo } from "../../models";
import dotenv from "dotenv";
dotenv.config();

const contactRoute = express.Router();

contactRoute.post(
  "/email",
  async (req: Request<{}, {}, ContactEmailInfo>, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Website contact mail from "${name}" (${email})`,
      text: `${message}\n\nContact ${name} at ${email}`,
    };

    transporter.sendMail(mailOptions, (err, inf) => {
      err ? console.log(err) : console.log("Message recieved!");
    });
  }
);

export default contactRoute;
