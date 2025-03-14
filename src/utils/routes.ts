import { apiUrl } from "./utils"

export  const routes = {
    login: `${apiUrl}/login`,
    register: `${apiUrl}/register`,
    me: `${apiUrl}/me`,
    budget: `${apiUrl}/budget`,
    budgets: `${apiUrl}/get-budgets`,
    createBudget: `${apiUrl}/create-budget`,
    updateBudget: `${apiUrl}/update-budget`,
    deleteBudget: `${apiUrl}/delete-budget`,
    addTransaction: `${apiUrl}/add-transaction`,
}