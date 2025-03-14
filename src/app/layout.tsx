"use client";

import { ThemeProvider } from "@components/theme-provider";
import { ThemeToggle } from "@components/theme-toggle";
import { ModalProvider } from "@components/modal-provider";
import { Inter } from "next/font/google";
import { Navigation } from "@components/navigation";
import "./globals.css";
import type React from "react";
import { usePathname } from "next/navigation";
import { routesWithoutNavigation } from "@components/conditional-layout";
import { FinanceProvider } from "@contexts/finance-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowNavigation = !routesWithoutNavigation.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <ModalProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FinanceProvider>
            <ThemeToggle />
              <div className="flex h-screen">
                {shouldShowNavigation && (
                  <aside className="w-64 bg-background border-r border-border p-4">
                    <h1 className="text-2xl font-bold mb-6">FinanzApp</h1>
                    <Navigation />
                  </aside>
                )}
                <main className="flex-1 p-8  overflow-auto">{children}</main>
              </div>
          </FinanceProvider>
        </ThemeProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
