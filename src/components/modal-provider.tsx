"use client";

import type React from "react";
import { ModalProvider as ModalContextProvider } from "@contexts/modal-context";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return <ModalContextProvider>{children}</ModalContextProvider>;
}
