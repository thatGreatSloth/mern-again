
import bcrypt from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { User } from "../models/user/user.model.js";

export const signup = async (req, res) => {
  //get details from request body
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      //check empty fields
      throw new Error("Please fill all the fields");
    }
    //check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //verify
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    //create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save(); // save user to database

    //create token
    generateTokenAndSetCookie(res, user._id); //mongoose gives _id to every document
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.json({ message: error.message });
  }


};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ message: "Please fill all required fields" });
    }

    //find user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: true, message: "User logged in" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const logout = async (req, res) => {
 
};
