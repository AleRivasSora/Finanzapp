"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Plus, DollarSign } from "lucide-react"
import { budgetValidationRules } from "@/utils/utils"
import { useFormValidator } from "@/hooks/useFormValidator"

interface Budget {
  name: string;
  amount: number;
}

interface AddBudgetDialogProps {
  onAddBudget: (budget: { name: string; amount: number }) => void
  newBudget: Budget; 
  setNewBudget: React.Dispatch<React.SetStateAction<Budget>>
}

export function AddBudgetDialog({ onAddBudget, newBudget, setNewBudget }: AddBudgetDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {validate, errors, cleanErrors} = useFormValidator()
  const currentDate = new Date().toLocaleDateString()

  const handleSubmit = () => {
    const {isValid} = validate({...newBudget}, budgetValidationRules)
    if(!isValid)return; 
    onAddBudget(newBudget)
    setIsOpen(false)
    setNewBudget({ name: "", amount: 0 })
    cleanErrors()
  }

  useEffect(()=> {
    if(!isOpen)return
    validate({ ...newBudget }, budgetValidationRules);

   
  },[newBudget])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>Enter the details of your new budget here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newBudget.name}
              onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
            />
             {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              {!newBudget.amount && <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />}
              <Input
                id="amount"
                type="number"
                className="pl-8"
                value={newBudget.amount === 0 ? "" : newBudget.amount}
                onChange={(e) =>{
                  setNewBudget({
                    ...newBudget,
                    amount: e.target.value === "" ? 0 : Number(e.target.value),
                  }); 
                }
                }
                />
                {errors.amount && <p className="text-red-500">{errors.amount}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" value={currentDate} readOnly className="text-muted-foreground" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

