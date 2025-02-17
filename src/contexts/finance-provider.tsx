"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Budget {
  id: number;
  category: string;
  amount: number;
  spent: number;
  month: string;
  year: number;
}

interface Transaction {
  id: number;
  budgetId: number;
  amount: number;
  date: string;
  description: string;
}

interface FinanceContextProps {
  currentBudget: number;
  expenses: number;
  savings: number;
  investments: number;
  debts: number;
  budgets: Budget[];
  transactions: Transaction[];
  setCurrentBudget: (value: number) => void;
  setExpenses: (value: number) => void;
  setSavings: (value: number) => void;
  setInvestments: (value: number) => void;
  setDebts: (value: number) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (id: number, updatedBudget: Partial<Budget>) => void;
  deleteBudget: (id: number) => void;
  addTransaction: (transaction: Transaction) => void;
}

const FinanceContext = createContext<FinanceContextProps | undefined>(
  undefined
);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [currentBudget, setCurrentBudget] = useState(5000);
  const [expenses, setExpenses] = useState(2000);
  const [savings, setSavings] = useState(3000);
  const [investments, setInvestments] = useState(1500);
  const [debts, setDebts] = useState(500);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addBudget = (budget: Budget) => {
    setBudgets([...budgets, budget]);
  };

  const updateBudget = (id: number, updatedBudget: Partial<Budget>) => {
    setBudgets(
      budgets.map((budget) =>
        budget.id === id ? { ...budget, ...updatedBudget } : budget
      )
    );
  };

  const deleteBudget = (id: number) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setCurrentBudget(currentBudget + transaction.amount);
  };

  return (
    <FinanceContext.Provider
      value={{
        currentBudget,
        expenses,
        savings,
        investments,
        debts,
        budgets,
        transactions,
        setCurrentBudget,
        setExpenses,
        setSavings,
        setInvestments,
        setDebts,
        addBudget,
        updateBudget,
        deleteBudget,
        addTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};
