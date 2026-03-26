import "dotenv/config";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { accountTable, usersTable } from "@repo/db";
import jwt from "jsonwebtoken";
import { CreateUserSchema, LoginSchema } from "@repo/zodschema";
import { parse } from "dotenv";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success) {
      return res.status(404).json({
        error: "Invalid Input",
      });
    }
    const { number, name, password } = parsedData.data;

    const existingUser = await usersTable.findOne({
      number: number,
    });

    if (existingUser) {
      return res.status(409).json({
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

    const userId = response._id;

    await accountTable.create({
      userId: userId,
      balance: 1 + Math.random() * 10000,
    });

    res.status(201).json({
      msg: "Users registered succesfully",
      data: {
        name: response?.name,
        id: response?._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsedData = LoginSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(404).json({
        error: "Invalid inputs",
      });
    }

    const { number, password } = parsedData.data;

    const [user] = await usersTable.find({
      number: number,
    });

    if (!user) {
      return res.status(401).json({
        error: "user not exists",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        error: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
        name: user.name,
        number:user.number
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      msg: "Logged In succesfully",
      _id: user._id,
      data:{
        name:user.name,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDetails = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const userId = req.user?._id;

    const user = await usersTable.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Authentication required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name ?? user.name;
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      msg: "Details Updated",
      data: {
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Server error",
    });
  }
};

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getUserByNumber = async (req: Request, res: Response) => {
  try {
    const raw = (req.query.filter as string) || "";
    const filter = escapeRegex(raw);

    const users = await usersTable
      .find({
        $or: [
          { name: { $regex: filter, $options: "i" } },
          { number: { $regex: filter, $options: "i" } },
        ],
      })
      .limit(20);

    return res.status(200).json({
      data: users.map((u) => ({ name: u.name, number: u.number, id: u._id })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
