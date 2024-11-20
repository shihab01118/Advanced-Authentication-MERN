import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

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
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send({ message: "login" });
};

export const logout = async (req, res) => {
  res.send({ message: "logout" });
};
