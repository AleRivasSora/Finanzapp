import { Card, CardContent } from "@/components/ui/card"
import { PiggyBank } from "lucide-react"

interface BudgetHeaderProps {
  totalBudget: number
}

export function BudgetHeader({ totalBudget }: BudgetHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card p-6 rounded-lg border shadow-sm">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <p className="text-muted-foreground">Manage your monthly budgets and transactions</p>
      </div>
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="rounded-full bg-primary/10 p-3">
            <PiggyBank className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
            <h2 className="text-2xl font-bold">${totalBudget}</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

