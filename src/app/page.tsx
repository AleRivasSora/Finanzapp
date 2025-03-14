"use client";

import { useState } from "react";
import { LoginForm } from "@components/login-form";
import { RegisterForm } from "@components/register-form";
import { useApi } from "@hooks/useApi";
import { useModal } from "@contexts/modal-context";
import { useFormValidator } from "@hooks/useFormValidator";
import { validationRules, loginValidationRules } from "@utils/utils";
import { useRouter } from "next/navigation";
import { apiUrl } from "@utils/utils";
import { routes } from "@utils/routes";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { showModal } = useModal();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { validate } = useFormValidator();
  

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    fetchData: loginFetch,
  } = useApi({});

  const {
    data: registerData,
    error: registerError,
    loading: registerLoading,
    fetchData: registerFetch,
  } = useApi({});

  const handleLogin = (email: string, password: string) => {
    const { isValid, errors } = validate(
      { email, password },
      loginValidationRules
    );
    if (isValid) {
      loginFetch(routes.login, "POST" ,{ email, password}, (data)=> handleLoginSuceess(data), (error) => showModal("Error", error.message ?? "An error occurred", "error"));
    } else {
      const errorMessages = Object.values(errors)
        .map((error) => `${error}.`)
        .join("\n");
      showModal("Error", errorMessages, "error");
    }
  };

  const handleRegister = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const { isValid, errors } = validate(
      { username, email, password, confirmPassword },
      validationRules
    );
    if (isValid) {
      registerFetch( routes.register,"POST",{ username, email, password }, (data) => handleRegisterSuccess(data), (error) => showModal("Error", registerError ?? "An error occurred", "error"));
    } else {
      const errorMessages = Object.values(errors)
        .map((error) => `${error}.`)
        .join("\n");
      showModal("Error", errorMessages, "error");
    }
  };

  const handleLoginSuceess = () => {
    showModal("Success", "Login successful", "success");
    router.push("/dashboard");
    
  }
  const handleRegisterSuccess = () => {
    showModal("Success", "Registration successful", "success");
    setIsLogin(true);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
}
