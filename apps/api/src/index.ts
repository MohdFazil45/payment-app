import "dotenv/config"
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.ts"
import accountRouter from "./routes/account.route.ts"
import cookieParser from "cookie-parser"
const app = express()
const PORT = process.env.PORT!

app.use(cors({
    origin: ["https://fazil-payflow.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),)
app.use(express.json())
app.use(cookieParser())

//? User Route
app.use("/",userRouter)

//? Accout Route
app.use("/",accountRouter)

app.listen(PORT,() => console.log(`Server is running on ${PORT}`))