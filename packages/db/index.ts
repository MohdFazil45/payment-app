import dotenv from "dotenv";
dotenv.config({path: "../../.env"})
import mongoose, { model, Schema } from "mongoose";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables") 
}

mongoose.connect(process.env.DATABASE_URL)

interface User {
    number :string,
    name:string,
    password:string
}

const userSchema = new Schema<User>({
    number:{type:String, unique:true, required:true},
    name:{type:String,required:true},
    password:{type:String, required:true}
})


export const usersTable = model<User>('User', userSchema)