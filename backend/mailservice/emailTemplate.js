export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background: #4CAF50;
      color: #fff;
      text-align: center;
      padding: 20px 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .verification-code {
      display: inline-block;
      font-size: 20px;
      background: #f9f9f9;
      color: #333;
      padding: 10px 20px;
      margin: 20px 0;
      border-radius: 5px;
      border: 1px dashed #4CAF50;
      font-weight: bold;
    }
    .email-footer {
      background: #f9f9f9;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Email Verification</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Thank you for signing up! Please use the verification code below to complete your registration:</p>
      <div class="verification-code">{verificationCode}</div>
      <p>If you didn’t request this, please ignore this email.</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
    <div class="email-footer">
      <p>Need help? <a href="mailto:support@example.com">Contact Support</a></p>
      <p>&copy; 2024 Your Company Name</p>
    </div>
  </div>
</body>
</html>
`;

export const SUCCESS_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background: #2196F3;
      color: #fff;
      text-align: center;
      padding: 20px 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 28px;
    }
    .email-body {
      padding: 20px;
      text-align: left;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .cta-button {
      display: inline-block;
      font-size: 16px;
      color: #fff;
      background: #2196F3;
      text-decoration: none;
      padding: 10px 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .cta-button:hover {
      background: #1976D2;
    }
    .email-footer {
      background: #f9f9f9;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #2196F3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Welcome to Auth Community!</h1>
    </div>
    <div class="email-body">
      <p>Hi {name}</p>
      <p>We’re thrilled to have you here! 🎉 You’re now part of a community that strives to deliver productivity.</p>
      <p>Here’s what you can do next:</p>
      <ul>
        <li>Explore your dashboard and personalize your profile.</li>
        <li>Start [using the product, browsing features, etc.].</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <a href="http://localhost:5173" class="cta-button">Get Started</a>
      <p>We’re here to help you succeed. Welcome aboard!</p>
    </div>
    <div class="email-footer">
      <p>Need assistance? <a href="mailto:support@example.com">Contact Support</a></p>
      <p>&copy; 2024 [Your Company Name]</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background: #4CAF50;
      color: #fff;
      text-align: center;
      padding: 20px 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: left;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .email-footer {
      background: #f9f9f9;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="email-body">
      <p>Hi {name},</p>
      <p>Your password has been successfully reset. You can now log in with your new password.</p>
      <p>If you did not request this change, please contact our support team immediately to secure your account.</p>
      <p>For any assistance, feel free to reach out to us.</p>
    </div>
    <div class="email-footer">
      <p>Need help? <a href="mailto:support@example.com">Contact Support</a></p>
      <p>&copy; 2024 Auth Community</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background: #FF5722;
      color: #fff;
      text-align: center;
      padding: 20px 10px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: left;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.5;
    }
    .cta-button {
      display: inline-block;
      font-size: 16px;
      color: #fff;
      background: #FF5722;
      text-decoration: none;
      padding: 10px 20px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .cta-button:hover {
      background: #E64A19;
    }
    .email-footer {
      background: #f9f9f9;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #FF5722;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="email-body">
      <p>Hi {name},</p>
      <p>You requested to reset your password. Click the button below to proceed:</p>
      <a href="{resetURL}" style="color: #FFF !important" class="cta-button">Reset Password</a>
      <p>If you did not request this change, you can safely ignore this email.</p>
    </div>
    <div class="email-footer">
      <p>Need assistance? <a href="mailto:support@example.com">Contact Support</a></p>
      <p>&copy; 2024 Auth Community</p>
    </div>
  </div>
</body>
</html>
`;
