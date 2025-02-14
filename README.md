# AuthDemo

**A Next.js authentication application with a sleek UI**

## Description

**A modern authentication application built with Next.js and React.**

This project demonstrates a secure and user-friendly authentication system. Key features include:

* **Robust Authentication:** 
    * Secure login and registration with strong password validation.
    * Comprehensive error handling with informative messages.

* **Elegant User Interface:** 
    * Designed with Tailwind CSS for a clean, modern, and visually appealing experience.

* **Efficient Development:** 
    * Utilizes custom hooks for reusable logic, improving code maintainability.

**Explore the project and experience a seamless authentication flow.** 

![screen](screen.png)

![screen](screen2.png)

![screen](screen3.png)
## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/AleRivasSora/AuthDemo]
    ```
2. **Install dependencies:**
 ```bash
   npm install
 ```

3. **Run development server:**
```bash

  npm run dev
```
4. **Access the app: Open http://localhost:3000 in your browser.**
## Features

* **Dark Mode:** Seamlessly switch between light and dark modes for optimal user experience.
* **Responsive Design:** The application adapts gracefully to different screen sizes and devices.
* **User Authentication:** 
    * Secure login and registration forms.
    * Robust password validation with strong requirements.
    * Clear and informative error handling for invalid inputs.
* **Custom Hooks:** 
    * Encapsulates reusable logic for form validation, data fetching, and other common tasks. 
    * Improves code maintainability and reusability.
## Tecnologies used

- **Next.js**: For server-side rendering and routing.
- **React**: For building the user interface.
- **Tailwind CSS**: For rapid UI development and styling.
- **Lucide-react**: For custom icons.

## Project Structure

This project follows a well-organized structure:

* **components/:** 
    * Contains reusable UI components for better code maintainability and modularity. 
    * Examples: `LoginForm`, `RegisterForm`, `Button`, `Input`, `Modal`.

* **hooks/:** 
    * Houses custom hooks for encapsulating reusable logic.
    * Examples: `useForm`, `useLocalStorage`, `useDebounce`.

* **pages/:** 
    * Holds the Next.js page components responsible for routing and rendering content.
    * Examples: `index.js`, `login.js`, `register.js`, `profile.js`.

* **public/:** 
    * Stores static assets such as images, icons, and fonts.

* **styles/:** 
    * Contains global styles using Tailwind CSS for consistent styling across the application.

* **utils/:** 
    * Includes helper functions and utility classes for common tasks.
    * Examples: `formatDate`, `validateEmail`, `apiRequests`.
## Final Note

---
**Made with ❤️ by Alexander Rivas Dev.**

**Contributions welcome and feel free to test it.**

**License:** MIT
