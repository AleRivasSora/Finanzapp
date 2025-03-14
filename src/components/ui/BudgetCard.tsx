import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Trash2, Wallet } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BudgetCardProps {
  budget: {
    id: string
    name: string
    amount: number
    initial_amount: number
    created_at: string
  }
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const progress = 100 - (budget.amount / budget.initial_amount) * 100

  return (
    <Card className="group relative hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold line-clamp-1">{budget.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => console.log("Delete")}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {format(new Date(budget.created_at), "dd/MM/yyyy")}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Amount Remaining</span>
            <span
              className={cn(
                "font-bold",
                progress > 75 ? "text-destructive" : progress > 50 ? "text-orange-500" : "text-primary",
              )}
            >
              ${budget.amount}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4" />
          <span>Initial amount: ${budget.initial_amount}</span>
        </div>
      </CardContent>
    </Card>
  )
}

