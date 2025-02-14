"use client";

import { Plus, ArrowUpRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PurchasesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Purchases</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            Export
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Purchase
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="    Search purchases..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food & Dining</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="3-months">Last 3 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
          <CardDescription>
            A list of your recent purchases and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  date: "2024-02-15",
                  description: "Grocery Shopping",
                  category: "Food & Dining",
                  payment: "Credit Card",
                  amount: 85.5,
                },
                {
                  date: "2024-02-14",
                  description: "Netflix Subscription",
                  category: "Entertainment",
                  payment: "PayPal",
                  amount: 14.99,
                },
                {
                  date: "2024-02-13",
                  description: "Gas Station",
                  category: "Transportation",
                  payment: "Debit Card",
                  amount: 45.0,
                },
                {
                  date: "2024-02-12",
                  description: "Electric Bill",
                  category: "Utilities",
                  payment: "Bank Transfer",
                  amount: 120.75,
                },
                {
                  date: "2024-02-11",
                  description: "Restaurant Dinner",
                  category: "Food & Dining",
                  payment: "Credit Card",
                  amount: 65.3,
                },
                {
                  date: "2024-02-10",
                  description: "Online Shopping",
                  category: "Shopping",
                  payment: "Credit Card",
                  amount: 99.99,
                },
                {
                  date: "2024-02-09",
                  description: "Uber Ride",
                  category: "Transportation",
                  payment: "PayPal",
                  amount: 22.5,
                },
                {
                  date: "2024-02-08",
                  description: "Gym Membership",
                  category: "Health & Fitness",
                  payment: "Bank Transfer",
                  amount: 50.0,
                },
              ].map((purchase, index) => (
                <TableRow key={index}>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell>{purchase.description}</TableCell>
                  <TableCell>{purchase.category}</TableCell>
                  <TableCell>{purchase.payment}</TableCell>
                  <TableCell className="text-right">
                    ${purchase.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">Page 1 of 10</div>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
