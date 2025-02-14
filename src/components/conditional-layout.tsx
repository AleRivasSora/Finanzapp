"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

// Rutas donde no queremos mostrar la navegación
export const routesWithoutNavigation = [
  "/login",
  "/register",
  "/forgot-password",
  "/",
];
