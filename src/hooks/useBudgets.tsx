"use client";

import { useEffect, useState } from "react";
import { useFinance } from "@contexts/finance-provider";

const getCurrentDateString = () => {
  const now = new Date();
  return `${now.toLocaleString("default", {
    month: "long",
  })} ${now.getDate()}, ${now.getFullYear()}`;
};

export function useBudgets() {
  const { addBudget, budgets,categories ,deleteBudget, addTransaction, currentBudget, getBudgets } =
    useFinance();
  const [newBudget, setNewBudget] = useState({
    id: 0,
    name: "",
    amount: 0,
    date: "",

  });
  const [newTransaction, setNewTransaction] = useState({
    budget_id: 0,
    amount: 0,
    date: "",
    description: "",
  });
  const [currentDate, setCurrentDate] = useState(getCurrentDateString());
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const handleAddBudget = () => {
    console.log("aaaaaaaaaa")
    console.log(newBudget)
    if (newBudget.name && newBudget.amount > 0 && currentDate) {
        addBudget({ name: newBudget.name, amount: newBudget.amount });
        setNewBudget({
            id: 0,
            name: "",
            amount: 0,
            date: "",
        });
        setIsAddBudgetOpen(false);
    }
};

  const handleAddTransaction = () => {
    console.log(newTransaction)
    if (
      newTransaction.budget_id &&
      newTransaction.amount > 0 &&
      currentDate
    ) {
      console.log("********************************")
      addTransaction(newTransaction);
      setNewTransaction({ budget_id: 0, amount: 0, date: "", description: "" });
      setIsAddTransactionOpen(false);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return {
    budgets,
    categories,
    currentBudget,
    addTransaction,
    addBudget,
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
