"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import { CalendarIcon, Plus, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialExpenses = [
  {
    id: 1,
    date: "2024-02-01",
    category: "Food",
    amount: 50,
    description: "Grocery shopping",
  },
  {
    id: 2,
    date: "2024-02-03",
    category: "Transportation",
    amount: 30,
    description: "Gas",
  },
  {
    id: 3,
    date: "2024-02-05",
    category: "Entertainment",
    amount: 80,
    description: "Movie night",
  },
  {
    id: 4,
    date: "2024-02-07",
    category: "Bills",
    amount: 120,
    description: "Electricity bill",
  },
  {
    id: 5,
    date: "2024-02-10",
    category: "Shopping",
    amount: 200,
    description: "New clothes",
  },
];

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Bills",
  "Shopping",
  "Other",
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function Expenses() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    category: "",
    amount: "",
    description: "",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          ...newExpense,
          id: expenses.length + 1,
          date: format(newExpense.date, "yyyy-MM-dd"),
        },
      ]);
      setNewExpense({
        date: new Date(),
        category: "",
        amount: "",
        description: "",
      });
      setIsAddExpenseOpen(false);
    }
  };

  const filteredExpenses = expenses
    .filter((expense) => !filterCategory || expense.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "amount") return b.amount - a.amount;
      return 0;
    });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const expensesByCategory = categories.map((category) => ({
    name: category,
    value: expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Category,Amount,Description\n" +
      filteredExpenses
        .map((e) => `${e.date},${e.category},${e.amount},${e.description}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenses Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalExpenses.toFixed(2)}
            </div>
            <p className="text-muted-foreground">Total expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your new expense here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-[280px] justify-start text-left font-normal col-span-3`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newExpense.date ? (
                          format(newExpense.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newExpense.date}
                        onSelect={(date) =>
                          setNewExpense({
                            ...newExpense,
                            date: date || new Date(),
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) =>
                      setNewExpense({ ...newExpense, category: value })
                    }
                  >
                    <SelectTrigger className="w-[280px] col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addExpense}>
                  Add Expense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Transactions</CardTitle>
          <CardDescription>A list of your recent expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>Showing {filteredExpenses.length} expenses</div>
          <div>Total: ${totalExpenses.toFixed(2)}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
