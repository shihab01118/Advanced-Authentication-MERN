import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

// sign up endpoint
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // check if all the parameters are provided
    if (!email || !password || !name) {
      throw new Error("All fields are Required!");
    }

    // check if the user is already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json();
    }

    // send verification code to user's email
    const verificationToken = generateVerificationToken();
    await sendVerificationEmail(email, verificationToken);

    // generate token and set in cookie
    generateTokenAndSetCookie(res, email);

    // convert password to hash encryption
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create new user based on the schema
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // save user to database
    await user.save();

    // send response
    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  // get verification code from user
  const { verificationCode } = req.body;

  try {
    // find user with the verification code and verification code expired or not
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    // if the condition not fulfill, send a error response
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification Code!",
      });
    }

    // else update user's fields
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    // save updated user to database
    await user.save();

    // now send a welcome email to navigate
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "User verified successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verify email: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found!" });
    }

    // validate password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password!" });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(res, email);

    // Update the user's last login date
    user.lasLoginDate = Date.now();
    await user.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    // Handle unexpected errors
    console.log("Error when login: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found!" });
    }

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hours

    // update user's field and save to database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiredAt = resetTokenExpiresAt;
    await user.save();

    // send reset password email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "password reset link sent to your email",
      });
  } catch (error) {
    // handle unexpected errors
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
