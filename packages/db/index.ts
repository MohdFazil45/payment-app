import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import mongoose, { model, Schema } from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

mongoose.connect(process.env.DATABASE_URL);

const userSchema = new Schema({
  number: { type: String, unique: true, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

const accountSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const transactionSchema = new Schema(
  {
    recieverNumber: {
      type:String,
      ref: "User",
      required: true,
    },
    senderNumber: {
      type: String,
      ref: "User",
      required: true,
    },
    amountSend: { type: Number, required: true },
    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "addedAt",
      updatedAt: "modifiedAt",
    },
  },
);

export const usersTable = model("User", userSchema);
export const accountTable = model("Account", accountSchema);
export const transactionTable = model("Transactions", transactionSchema);
