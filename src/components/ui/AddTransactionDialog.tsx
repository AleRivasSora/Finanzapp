"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CalendarIcon, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddTransactionDialogProps {
  budgets: Array<{ id: number; name: string }>
  onAddTransaction: any
  newTransaction: Transaction
  setNewTransaction: React.Dispatch<React.SetStateAction<Transaction>>
}

interface Transaction {
  id?: string; 
  budget_id: string;
  amount: number;
  date: string; 
  description: string;
}

export function AddTransactionDialog({ budgets, onAddTransaction, newTransaction, setNewTransaction }: AddTransactionDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentDate = new Date().toLocaleDateString()
  const [selectedBudgetName, setSelectedBudgetName] = useState("");

  const handleSubmit = () => {
    
    onAddTransaction()
    setIsOpen(false)
    setNewTransaction({
      budget_id: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>Record a new transaction for your selected budget.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="budget_id">Budget</Label>
            <Select
              value={String(newTransaction.budget_id)}
              onValueChange={(value) => {
                const selectedBudget = budgets.find(budget => budget.id === value);
                setSelectedBudgetName(selectedBudget ? selectedBudget.name : ""); 
                setNewTransaction({
                  ...newTransaction,
                  budget_id: value,
                });
              }}
            >
              <SelectTrigger>
              <SelectValue placeholder="Select Budget">{selectedBudgetName || "Select Budget"}</SelectValue> 
              </SelectTrigger>
              <SelectContent>
                {budgets.map((budget) => (
                  <SelectItem key={budget.id} value={String(budget.id)}>
                    {budget.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              {!newTransaction.amount  && <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />}
              <Input
                id="amount"
                type="number"
                className="pl-8"
                value={newTransaction.amount === 0 ? "" : newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value === "" ? 0 : Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" value={currentDate} readOnly className="text-muted-foreground" />
          </div>
          <div className="grid gap-2">
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
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

