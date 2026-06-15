import express from "express";
import { expenses } from "../models/Expenses.js";
import {
  deleteExpense,
  createExpense,
  getExpenses,
} from "../controllers/expensesControllers.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);

export default router;
