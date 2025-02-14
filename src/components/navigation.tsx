"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  DollarSign,
  PieChart,
  Calendar,
  Target,
  BarChart,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Expenses", href: "/expenses", icon: DollarSign },
  { name: "Budgets", href: "/budgets", icon: PieChart },
  { name: "Purchases", href: "/purchases", icon: Calendar },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-left px-4 py-2 text-sm font-medium rounded-md ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-primary/10"
            }`}
          >
            <item.icon className="mr-3 h-6 w-6" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
