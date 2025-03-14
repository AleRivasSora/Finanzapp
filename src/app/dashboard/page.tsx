"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import InfoCard from "@/components/ui/info-card";
import LineChartCard from "@/components/ui/line-chart-card";

const cardStyles = {
  title: "flex items-center justify-between",
  content: "text-sm font-medium",
}

const monthlyData = [
  { name: "Jan", expenses: 2100, savings: 2800 },
  { name: "Feb", expenses: 2000, savings: 3000 },
  { name: "Mar", expenses: 2300, savings: 2700 },
  { name: "Apr", expenses: 1800, savings: 3200 },
  { name: "May", expenses: 2000, savings: 3000 },
  { name: "Jun", expenses: 2200, savings: 2800 },
];

const cardData = [
  {
    title: "Total Budget",
    amount: "$5,000",
    description: "Monthly allocation",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Expenses",
    amount: "$2,000",
    change: "+12% from last month",
    changeType: "negative",
    icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Savings",
    amount: "$3,000",
    change: "+8% from last month",
    changeType: "positive",
    icon: <PiggyBank className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Investments",
    amount: "$1,500",
    change: "Updated today",
    icon: <ArrowUp className="h-4 w-4 text-muted-foreground" />,
  },
];

const events = {
  "2024-02-15": "bill",
  "2024-02-20": "income",
  "2024-02-25": "savings",
};

export default function Dashboard() {
  const getEventClass = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    switch (events[dateStr as keyof typeof events]) {
      case "bill":
        return "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "income":
        return "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "savings":
        return "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <InfoCard key={index} {...card} /> 
      ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Bar
                  dataKey="expenses"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary opacity-30"
                />
                <Bar
                  dataKey="savings"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-red-200 text-red-700">
                Bills
              </Badge>
              <Badge variant="outline" className="bg-green-200 text-green-700">
                Income
              </Badge>
              <Badge variant="outline" className="bg-blue-200 text-blue-700">
                Savings
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="rounded-md border"
              modifiers={{
                event: (date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  return dateStr in events;
                },
              }}
              modifiersClassNames={{
                event: (date) => getEventClass(date),
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <LineChartCard
        title="Savings Trend"
        data={monthlyData} 
        dataKey="savings" 
        strokeColor="white" 
        height={350} 
      />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`${cardStyles.title}`}>
                <span className={`${cardStyles.content}`}>Total Savings</span>
                <span className="font-bold">$3,000</span>
              </div>
              <div className={`${cardStyles.title}`}>
                <span className={`${cardStyles.content}`}>Investments</span>
                <span className="font-bold">$1,500</span>
              </div>
              <div className={`${cardStyles.title}`}>
                <span className={`${cardStyles.content}`}>Debts</span>
                <span className="font-bold text-red-600">$500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
