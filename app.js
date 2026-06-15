import express from "express";
import routesExpenses from "./routes/routesExpenses.js";

const app = express();

app.use(express.json());

app.use("/api/expenses", routesExpenses);

export default app;
