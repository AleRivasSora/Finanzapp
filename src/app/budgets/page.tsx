"use client";

import { BudgetHeader } from "@/components/ui/BudgetHeader"
import { BudgetCard } from "@/components/ui/BudgetCard"
import { AddBudgetDialog } from "@/components/ui/AddBudgetDialog"
import { AddTransactionDialog } from "@/components/ui/AddTransactionDialog"
import { Plus, CalendarIcon } from "lucide-react";
import { useBudgets } from "@hooks/useBudgets";

export default function Budgets() {
  const {
    budgets,
    categories,
    currentBudget,
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
    addTransaction
  } = useBudgets();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <BudgetHeader totalBudget={5000} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id.toString} budget={budget} />
        ))}
      </div>

      <div className="flex gap-2">
        <AddBudgetDialog newBudget={newBudget} setNewBudget={setNewBudget} onAddBudget={()=>handleAddBudget()} />
        <AddTransactionDialog budgets={budgets} newTransaction={newTransaction} setNewTransaction={setNewTransaction} onAddTransaction={handleAddTransaction} />
      </div>
    </div>
  );
}
