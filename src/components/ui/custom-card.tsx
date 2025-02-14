import type React from "react";
import { cn } from "@utils/utils";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

export function CustomCard({
  title,
  children,
  bgColor = "bg-card",
  className,
  ...props
}: CustomCardProps) {
  return (
    <div
      className={cn(
        bgColor,
        "text-card-foreground rounded-lg shadow-md p-6",
        className
      )}
      {...props}
    >
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
