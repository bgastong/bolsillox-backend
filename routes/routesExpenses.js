import express from "express";
import { expenses } from "../models/Expenses.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(expenses);
});

router.post("/", (req, res) => {
  const { amount, category, method, date } = req.body;

  if (amount === "" || amount === null || amount === undefined) {
    return res.status(400).json({
      message: "Ingrese monto mayor a 0",
    });
  }

  if (!category || !method || !date) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  if (category === "" || method === "" || date === "") {
    return res.status(400).json({
      message: "Debes llenar los campos",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "El monto debe ser mayor a 0",
    });
  }

  const newExpense = {
    id: expenses.length + 1,
    amount,
    category,
    method,
    date,
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

router.delete("/:id", (req, res) => {
  item.remove({});
});

export default router;
