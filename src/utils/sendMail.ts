import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOption {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
  companyEmail: string;
}

const sendMail = async (options: EmailOption): Promise<void> => {
  const { data, email, subject, template, companyEmail } = options;
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: companyEmail,
      pass: "awoq umyy wvun nibv",
    },
  });

  const templatePath = path.join(__dirname, "../mail", template);

  const html = await ejs.renderFile(templatePath, data);
  await transporter.sendMail({
    from: companyEmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;
