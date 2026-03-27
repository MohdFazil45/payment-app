import { accountTable, transactionTable, usersTable } from "@repo/db";
import { PaymentSchema } from "@repo/zodschema";
import type { Request, Response } from "express";
import mongoose from "mongoose";

export const checkBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const account = await accountTable.findOne({
      userId: userId,
    });

    if (!account) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Server error",
    });
  }
};

export const transfer = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  console.log("HEre");
  session.startTransaction();

  const safeParsed = PaymentSchema.safeParse(req.body);
  console.log(req.body);
  if (!safeParsed.success) {
    return res.status(404).json({
      error: "Invalid Inputs",
    });
  }

  const { amountSend, receiverNumber, note } = safeParsed.data;

  const amountSend2 = Number(amountSend);

  if (!amountSend || amountSend2 <= 0 || !receiverNumber) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const receiver = await usersTable.findOne({
    number:receiverNumber
  })

  const receiverName = receiver?.name

  if (!receiverName) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const userId = req.user?._id;

  const senderAccount = await accountTable
    .findOne({
      userId: userId,
    })
    .session(session);

  if (!senderAccount || senderAccount.balance < amountSend2) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficient balance",
    });
  }

  const reciever = await usersTable.findOne({
    number: receiverNumber,
  });

  const recieverUserId = reciever?._id;

  const recieverAccount = await accountTable
    .findOne({
      userId: recieverUserId,
    })
    .session(session);

  if (!recieverAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      error: "Invalid account",
    });
  }

  if (senderAccount.userId.toString() === recieverAccount.userId.toString()) {
    await session.abortTransaction();
    return res.status(400).json({ error: "Cannot transfer to yourself" });
  }

  await accountTable
    .updateOne({ userId: userId }, { $inc: { balance: -amountSend } })
    .session(session);
  await accountTable
    .updateOne({ userId: recieverUserId }, { $inc: { balance: amountSend } })
    .session(session);

  const sender = await usersTable.findById(userId);

  await transactionTable.create({
    receiverName:receiverName,
    receiverNumber: receiverNumber,
    senderNumber: sender?.number,
    senderName:sender?.name,
    amountSend: amountSend2,
    note: note,
  });

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userNumber = req.user?.number;

    const transactions = await transactionTable
      .find({
        $or: [{ senderNumber: userNumber }, { receiverNumber: userNumber }],
      } as any)
      .sort({ addedAt: -1 })
      .limit(20);

    if (transactions.length === 0) {
      return res.status(200).json({ transactions: [] });
    }

    const formattedTransactions = transactions.map((tx: any) => {
      const isSender = tx.senderNumber === userNumber;

      return {
        _id: tx._id,
        amount: tx.amountSend,
        addedAt: tx.addedAt,
        type: isSender ? "sent" : "received",
        message: isSender ? "Money sent" : "Money received",

        // full raw data if you still want it
        senderName: tx.senderName || "",
        senderNumber: tx.senderNumber || "",
        receiverName: tx.receiverName || "",
        receiverNumber: tx.receiverNumber || "",
        note: tx.note || "",

        displayName: isSender
          ? tx.receiverName || "Unknown User"
          : tx.senderName || "Unknown User",

        displayNumber: isSender
          ? tx.receiverNumber || "No Number"
          : tx.senderNumber || "No Number",
      };
    });

    console.log("FORMATTED:", formattedTransactions);

    return res.status(200).json({ transactions: formattedTransactions });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
