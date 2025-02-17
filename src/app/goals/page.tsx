import {
  Plus,
  ArrowUpRight,
  Target,
  Trophy,
  Sparkles,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GoalsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Goals</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            Export
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 short-term, 3 long-term
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,750</div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Goals
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal Due</CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 days</div>
            <p className="text-xs text-muted-foreground">Emergency Fund</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Goals</h2>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter goals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Goals</SelectItem>
            <SelectItem value="short-term">Short Term</SelectItem>
            <SelectItem value="long-term">Long Term</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Emergency Fund",
            target: 10000,
            current: 7500,
            deadline: "2024-05-01",
            type: "Short Term",
          },
          {
            name: "Down Payment for House",
            target: 50000,
            current: 20000,
            deadline: "2026-12-31",
            type: "Long Term",
          },
          {
            name: "New Car",
            target: 25000,
            current: 15000,
            deadline: "2025-06-30",
            type: "Long Term",
          },
          {
            name: "Vacation to Europe",
            target: 5000,
            current: 3250,
            deadline: "2024-08-15",
            type: "Short Term",
          },
          {
            name: "Retirement Fund",
            target: 500000,
            current: 100000,
            deadline: "2045-01-01",
            type: "Long Term",
          },
        ].map((goal, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
              <CardDescription>{goal.type} Goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress
                  value={(goal.current / goal.target) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {((goal.current / goal.target) * 100).toFixed(1)}% completed
                </p>
                <p className="text-sm">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
