"use client";

import { useState } from "react";
import { useFinance } from "@contexts/finance-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, CalendarIcon } from "lucide-react";
import { useBudgets } from "@hooks/useBudgets";

export default function Budgets() {
  const {
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
  } = useBudgets();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Budgets</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Current Budget: ${currentBudget}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <Card key={budget.id}>
            <CardHeader>
              <CardTitle>
                {budget.category} - {budget.month} {budget.year}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Amount: ${budget.amount}</p>
              <p className="text-lg">Spent: ${budget.spent}</p>
              <p className="text-lg">
                Remaining: ${budget.amount - budget.spent}
              </p>
              <Button variant="outline" onClick={() => deleteBudget(budget.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Budget</DialogTitle>
              <DialogDescription>
                Enter the details of your new budget here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="category" className="text-right col-span-1">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newBudget.category}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, category: e.target.value })
                  }
                  className="flex-grow w-3/4 max-w-md"
                />
              </div>
              <div className="flex items-center gap-6">
                <Label htmlFor="amount" className="text-right col-span-1">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newBudget.amount}
                  onChange={(e) =>
                    setNewBudget({
                      ...newBudget,
                      amount: Number(e.target.value),
                    })
                  }
                  className="flex-grow w-3/4 max-w-md"
                />
              </div>
              <div className="flex items-center gap-11">
                <Label htmlFor="date" className="text-right col-span-1">
                  Date
                </Label>

                <Input
                  id="date"
                  value={currentDate}
                  readOnly
                  className="flex-grow w-full max-w-md text-center"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddBudget}>
                Add Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isAddTransactionOpen}
          onOpenChange={setIsAddTransactionOpen}
        >
          <DialogTrigger asChild>
            <Button className="mt-4">Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="budgetId">Budget</Label>
                <select
                  id="budgetId"
                  value={newTransaction.budgetId}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      budgetId: Number(e.target.value),
                    })
                  }
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Budget</option>
                  {budgets.map((budget) => (
                    <option key={budget.id} value={budget.id}>
                      {budget.category} - {budget.month} {budget.year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input id="date" value={newTransaction.date} readOnly />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={new Date(newTransaction.date)}
                      onChange={(date) =>
                        setNewTransaction({
                          ...newTransaction,
                          date: date.toISOString().split("T")[0],
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={handleAddTransaction}>Add Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
