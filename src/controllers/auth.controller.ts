// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Asegúrate de que estás importando desde el archivo correcto
require('dotenv').config();

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
    console.log(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
