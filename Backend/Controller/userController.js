import expressAsyncHandler from "express-async-handler";
import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }
  
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({name, email, password: hashedPassword})

  if(user){
    res.status(201).json({_id:user.id, name: user.name, email: user.email, token: generateJWTtoken(user._id)})
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({_id:user.id, name:user.name, email:user.email, token: generateJWTtoken(user._id)})
  } else {
    res.status(400);
    throw new Error('Invalid Data')
  }
});

const getCurrentUser = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Current User Data" });
});

const generateJWTtoken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '5d'})

export { registerUser, loginUser, getCurrentUser };
