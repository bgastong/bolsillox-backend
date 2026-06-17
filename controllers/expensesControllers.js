import { expenses } from "../models/Expenses.js";

const validateExpense = ({ amount, category, method, date }) => {
  if (!amount || !category || !method || !date) {
    return "Todos los campos son obligatorios";
  }

  if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
    return "El monto debe ser un numero mayor a 0";
  }

  return null;
};

export const getExpenses = (req, res) => {
  res.json(expenses);
};

export const createExpense = (req, res) => {
  const { amount, category, method, date } = req.body;

  const error = validateExpense({ amount, category, method, date });

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }

  const newExpense = {
    id: Date.now(),
    amount: Number(amount),
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

export const updateExpense = (req, res) => {
  const { id } = req.params;
  const { amount, category, method, date } = req.body;

  const idExpense = Number(id);
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === idExpense,
  );

  if (expenseIndex === -1) {
    return res.status(404).json({
      message: "No existe ese id de gasto",
    });
  }

  const error = validateExpense({ amount, category, method, date });

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }

  const updatedExpense = {
    id: idExpense,
    amount: Number(amount),
    category,
    method,
    date,
  };

  expenses[expenseIndex] = updatedExpense;

  res.json({
    message: "Gasto actualizado correctamente",
    expense: updatedExpense,
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
