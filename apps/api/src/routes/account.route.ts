import express from "express"
import { checkBalance, getTransactions, transfer } from "../controllers/account.controller.ts"
import { authMiddleware } from "../middlewares/user.middleware.ts"
import router from "./user.route.ts"
const route = express.Router()

route.get("/balance",authMiddleware,checkBalance)
route.post("/transfer",authMiddleware,transfer)
router.get("/transactions",authMiddleware,getTransactions)

export default route