import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are Required!");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json();
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: generateVerificationToken(),
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

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
