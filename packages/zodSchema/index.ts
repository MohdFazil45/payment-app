import z from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 charcters required")
    .max(20, "Maximum 20 characters required")
    .nonempty("Required"),
  number: z
    .string()
    .min(10, "Invalid Number")
    .max(10, "Invalid Number")
    .nonempty("Required"),
  password: z.string().nonempty("Required"),
});

export const LoginSchema = z.object({
  number: z
    .string()
    .min(10, "Invalid Number")
    .max(10, "Invalid Number")
    .nonempty("Required"),
  password: z.string().nonempty("Required"),
});

export const PaymentSchema = z.object({
  note: z.string().max(30, "Maximum 30 characters required"),
  amountSend: z.string(),
  receiverNumber: z
    .string()
    .min(10, "Invalid Number")
    .max(10, "Invalid Number")
    .nonempty("Required"),
});
