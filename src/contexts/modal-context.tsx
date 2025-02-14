"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import { Modal } from "@components/ui/modal";

interface ModalContextType {
  showModal: (
    title: string,
    message: string,
    type: "error" | "success" | "info" | "warning"
  ) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "error" | "success" | "info" | "warning",
  });

  const showModal = (
    title: string,
    message: string,
    type: "error" | "success" | "info" | "warning"
  ) => {
    setModalState({ isOpen: true, title, message, type });
  };

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
