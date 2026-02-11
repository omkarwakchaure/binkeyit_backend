import dotenv from "dotenv";
import Resend from "resend";

dotenv.config();

if (!process.env.RESEND_API) {
  console.log("Resend_API is not defined");
}

const resend = Resend(process.env.RESEND_API);

const sendEmail = async ({ name, sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "BINKEYIT <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
