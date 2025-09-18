import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "Username or email already exists...." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role });
  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Error Occurred");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (!userExists) {
    res.status(404);
    throw new Error("Username not found");
  }
  if (userExists) {
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }
    if (isPasswordValid) {
      createToken(res, userExists._id);
      res.status(201).json({
        _id: userExists._id,
        username: userExists.username,
        role: userExists.role,
      });
      return;
    }
  } else {
    console.error(error);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully" });
});

const getAllUsers = asyncHandler(async (req,res)=>{
  const users = await User.find({})
  res.json(users)
})
export { createUser, loginUser, logoutUser, getAllUsers };
