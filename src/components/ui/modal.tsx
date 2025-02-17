import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "error" | "success" | "info" | "warning";
}

export function Modal({ isOpen, onClose, title, message, type }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const bgColorClass = {
    error: "bg-red-100 dark:bg-red-900",
    success: "bg-green-100 dark:bg-green-900",
    info: "bg-blue-100 dark:bg-blue-900",
    warning: "bg-yellow-100 dark:bg-yellow-900",
  }[type];

  const textColorClass = {
    error: "text-red-800 dark:text-red-200",
    success: "text-green-800 dark:text-green-200",
    info: "text-blue-800 dark:text-blue-200",
    warning: "text-yellow-800 dark:text-yellow-200",
  }[type];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative w-full max-w-md min-w-[300px] min-h-[200px] p-6 rounded-lg shadow-xl ${bgColorClass} ${textColorClass} flex flex-col items-center justify-center`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
        <p className="text-left whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}
