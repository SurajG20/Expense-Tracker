import { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
export const Register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({ message: 'User Added', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    const userObject = { userId: user._id.toString() };

    const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY as Secret, {
      expiresIn: '1d',
    });
    const { password, ...rest } = user._doc;
    res.status(200).json({
      ...rest,
      message: 'User is logged in successfully.',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'User is logged out successfully.' });
};
