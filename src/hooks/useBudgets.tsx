"use client";

import { useState } from "react";
import { useFinance } from "@contexts/finance-provider";
import { format } from "date-fns";

const getCurrentDateString = () => {
  const now = new Date();
  return `${now.toLocaleString("default", {
    month: "long",
  })} ${now.getDate()}, ${now.getFullYear()}`;
};

export function useBudgets() {
  const { budgets, addBudget, deleteBudget, addTransaction, currentBudget } =
    useFinance();
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: 0,
    month: "",
    year: new Date().getFullYear(),
  });
  const [newTransaction, setNewTransaction] = useState({
    budgetId: 0,
    amount: 0,
    date: "",
    description: "",
  });
  const [currentDate, setCurrentDate] = useState(getCurrentDateString());
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount > 0 && newBudget.month) {
      addBudget({ ...newBudget, id: budgets.length + 1, spent: 0 });
      setNewBudget({
        category: "",
        amount: 0,
        month: "",
        year: new Date().getFullYear(),
      });
      setIsAddBudgetOpen(false);
    }
  };

  const handleAddTransaction = () => {
    if (
      newTransaction.budgetId &&
      newTransaction.amount > 0 &&
      newTransaction.date
    ) {
      addTransaction({ ...newTransaction, id: Date.now() });
      setNewTransaction({ budgetId: 0, amount: 0, date: "", description: "" });
      setIsAddTransactionOpen(false);
    }
  };

  return {
    budgets,
    currentBudget,
    newBudget,
    setNewBudget,
    newTransaction,
    setNewTransaction,
    currentDate,
    isAddBudgetOpen,
    setIsAddBudgetOpen,
    isAddTransactionOpen,
    setIsAddTransactionOpen,
    handleAddBudget,
    handleAddTransaction,
  };
}
