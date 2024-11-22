import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: process.env.WELCOME_EMAIL_TEMPLATE_UUID,
      template_variables: {
        company_info_name: "Authentication Company",
        name: name,
      },
    });
    console.log("Welcome email sent successfully ", response);
  } catch (error) {
    console.log("Error sending welcome email: ", error);
    throw new error(`Error sending welcome email: ${error}`);
  }
};
