import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE
} from './emailTemplate.js';
import { mailtrapClient, sender } from './mailtrap.config.js';
import { transporter } from './nodemailer.config.js';

// email service with mailtrap
export const sendVerificationEmailWithMailtrap = async (
  email,
  verificationToken
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify Your Email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification'
    });
    console.log('Verification email sent successfully', response);
  } catch (error) {
    console.error('Error sending verification email', error);
    throw new Error('Error sending verification email');
  }
};

export const sendWelcomeEmailWithMailtrap = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: process.env.WELCOME_EMAIL_TEMPLATE_UUID,
      template_variables: {
        company_info_name: 'Authentication Company',
        name: name
      }
    });
    console.log('Welcome email sent successfully ', response);
  } catch (error) {
    console.log('Error sending welcome email: ', error);
    throw new error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmailWithMailtrap = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Reset Your Password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset'
    });
    console.log('Reset password email sent successfully: ', response);
  } catch (error) {
    console.log('Error sending password reset email: ', error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmailWithMailtrap = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset'
    });
    console.log('Password reset success email sent successfully: ', response);
  } catch (error) {
    console.log('Error sending password reset success email: ', error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

// email service with nodemailer
export const sendVerificationEmailWithNodemailer = async (
  email,
  verificationToken
) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: 'Verify Your Email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      )
    });
    console.log(
      'Verification email sent successfully with nodemailer',
      response
    );
  } catch (error) {
    console.error('Error sending verification email with nodemailer', error);
    throw new Error('Error sending verification email with nodemailer');
  }
};

export const sendWelcomeEmailWithNodemailer = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: 'Welcome to Auth Community',
      html: SUCCESS_EMAIL_TEMPLATE.replace('{name}', name)
    });
    console.log('Welcome email sent successfully with nodemailer', response);
  } catch (error) {
    console.error('Error sending welcome email with nodemailer', error);
    throw new Error('Error sending welcome email with nodemailer');
  }
};

export const sendPasswordResetEmailWithNodemailer = async (
  name,
  email,
  resetURL
) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: 'Reset Your Password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{name}', name).replace(
        '{resetURL}',
        resetURL
      )
    });
    console.log(
      'Reset password email sent successfully with nodemailer',
      response
    );
  } catch (error) {
    console.error('Error sending reset password email with nodemailer', error);
    throw new Error('Error sending reset password email with nodemailer');
  }
};

export const sendResetSuccessEmailWithNodemailer = async (name, email) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name)
    });
    console.log(
      'Password reset success email sent successfully with nodemailer',
      response
    );
  } catch (error) {
    console.error(
      'Error sending password reset success email with nodemailer',
      error
    );
    throw new Error(
      'Error sending password reset success email with nodemailer'
    );
  }
};
