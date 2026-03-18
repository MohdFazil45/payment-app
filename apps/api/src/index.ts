import "dotenv/config"
import express from "express"
import authRouter from "./routes/auth.route.ts"
const app = express()
app.use(express.json())

app.use("/",authRouter)

app.listen(8000,() => console.log("Server is running "))