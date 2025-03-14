"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {useApi} from "@hooks/useApi";
import {routes} from "@utils/routes";
import { apiUrl } from "@/utils/utils";
import { UUID } from "crypto";
import { set } from "date-fns";
import { useModal } from "./modal-context";
import { error } from "console";


interface Budget {
    id: string; // Use string for UUIDs
    name: string;
    amount: number;
    initial_amount: number;
    created_at: string;
    updated_at: string;
    user_id: number; 
}

interface Transaction {
    id: string; // Use string for UUIDs
    budget_id: string; // Use string for UUIDs
    amount: number;
    date: string; // Store date as string (YYYY-MM-DD)
    description: string;
}

interface FinanceContextProps {
    categories: CategoriesProps | undefined;
    currentBudget: Budget[]|undefined;
    expenses: number;
    savings: number;
    investments: number;
    debts: number;
    budgets: Budget[];
    transactions: Transaction[];
    setCurrentBudget: (value: number) => void;
    setExpenses: (value: number) => void;
    setSavings: (value: number) => void;
    setInvestments: (value: number) => void;
    setDebts: (value: number) => void;
    getBudgets: () => Promise<void>; // Fetch budgets from backend
    addBudget: (budget: Budget) => Promise<void>; // Add budget to backend
    loadingBudget: boolean;
    errorMessage: string | null;
    updateBudget: (id: string, updatedBudget: Partial<Budget>) => Promise<void>;
    deleteBudget: (id: string) => Promise<void>;
    getTransactions: (budget_id: string) => Promise<void>; // Fetch transactions
    addTransaction: (transaction: Transaction) => Promise<void>; // Add transaction
    updateTransaction: (id: string, updatedTransaction: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
}

interface CategoriesProps {
    id: string;
    name: string;
    is_initial: boolean;
    user_id: number;
}

const FinanceContext = createContext<FinanceContextProps | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
    const {data: dataBudget, error: errorMessage, loading: loadingBudget, fetchData: fetchData } = useApi({});
    const [categories, setCategories] = useState<CategoriesProps>();
    const [currentBudget, setCurrentBudget] = useState<any>();
    const [expenses, setExpenses] = useState(0); 
    const [savings, setSavings] = useState(0); 
    const [investments, setInvestments] = useState(0); 
    const [debts, setDebts] = useState(0); 
    const [budgets, setBudgets] = useState<any>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const {showModal} = useModal()


    // ######## budgets ####
    const getBudgets = async () => {
        fetchData(routes.budgets, "GET", null, (data) => {setBudgets(data.data)});
    };

    const addBudget = async (budget: Budget) => {
        fetchData(routes.createBudget, "POST", budget, 
            (data) => { setBudgets([...budgets, data]); showModal("success", data.message, "success") , 
            (error) => {showModal("error", errorMessage, "error")}
            });
    };

    const getBudget = async (id: string) => {
        fetchData(routes.budget, "GET", {}, (data) => {setCurrentBudget(data)});
    }

    const updateBudget = async (id: string, updatedBudget: Partial<Budget>) => {
        // Implement update logic (fetch PUT request to /api/update-budget/:id)
    };

    const deleteBudget = async (id: string) => {
        // Implement delete logic (fetch DELETE request to /api/delete-budget/:id)
    };

    const getTransactions = async (budget_id: string) => {
        // Fetch transactions for a specific budget (fetch GET to /api/get-transactions/:budget_id)
    };

    const addTransaction = async (transaction: Transaction) => {
        fetchData(routes.addTransaction, "POST", transaction, (data) => {
            setTransactions([...transactions, data.transactions]);  getBudgets(); 
        })
    };

    const updateTransaction = async (id: string, updatedTransaction: Partial<Transaction>) => {
        // Implement update logic (fetch PUT request to /api/update-transaction/:id)
    };

    const deleteTransaction = async (id: string) => {
        // Implement delete logic (fetch DELETE request to /api/delete-transaction/:id)
    };

    const getMe = async () => {     
        const handleGetMe = (data) => {
            setCategories(data);
        }
        fetchData(routes.me, "GET", null, (data) => {handleGetMe(data.categories)});
    }

    useEffect(() => {
        getMe();
    }, []);

    return (
        <FinanceContext.Provider
            value={{
                categories,
                loadingBudget,
                errorMessage,
                currentBudget,
                expenses,
                savings,
                investments,
                debts,
                budgets,
                transactions,
                setCurrentBudget,
                setExpenses,
                setSavings,
                setInvestments,
                setDebts,
                getBudgets,
                addBudget,
                updateBudget,
                deleteBudget,
                getTransactions,
                addTransaction,
                updateTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error("useFinance must be used within a FinanceProvider");
    }
    return context;
};