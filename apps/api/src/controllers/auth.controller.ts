import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { usersTable } from "@repo/db";

export const register = async (req: Request, res: Response) => {
  try {
    const { number, name, password } = req.body;

    const existingUser = await usersTable.findOne({
      number: number,
    });

    if (existingUser) {
      return res.status(401).json({
        error: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(403).json({
        error: "Password not hashed",
      });
    }

    const response = await usersTable.create({
      number: number,
      name: name,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "Users registered succesfully",
      data: {
        name: response?.name,
        id: response?._id,
      },
    });
  } catch (error) {
    console.error(error)
  }
};
