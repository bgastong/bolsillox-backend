import { expenses } from "../models/Expenses.js";

export const getExpenses = (req, res) => {
  res.json(expenses);
};

export const createExpense = (req, res) => {
  const { amount, category, method, date } = req.body;

  const newExpense = {
    id: Date.now(),
    amount,
    category,
    method,
    date,
  };

  expenses.push(newExpense);

  res.status(201).json({
    message: "Gasto creado correctamente",
    expense: newExpense,
  });
};

export const deleteExpense = (req, res) => {
  const { id } = req.params;

  const idExpense = Number(id);

  const expense = expenses.find((expense) => expense.id === idExpense);

  if (!expense) {
    return res.status(404).json({
      message: "No existe ese id de gasto",
    });
  }

  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === idExpense,
  );

  expenses.splice(expenseIndex, 1);

  res.json({
    message: "Gasto eliminado correctamente",
  });
};
