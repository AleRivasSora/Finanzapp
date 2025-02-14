"use client";

import { useState } from "react";
import { LoginForm } from "@components/login-form";
import { RegisterForm } from "@components/register-form";
import { useApi } from "@hooks/useApi";
import { useModal } from "@contexts/modal-context";
import { useFormValidator } from "@hooks/useFormValidator";
import { validationRules, loginValidationRules } from "@utils/utils";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { showModal } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { validate } = useFormValidator();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    fetchData: loginFetch,
  } = useApi({
    url: `${apiUrl}/login`,
    method: "POST",
    body: { email, password },
  });

  const {
    data: registerData,
    error: registerError,
    loading: registerLoading,
    fetchData: registerFetch,
  } = useApi({
    url: `${apiUrl}/register`,
    method: "POST",
    body: { name, email, password },
  });

  const handleLogin = (email: string, password: string) => {
    const { isValid, errors } = validate(
      { email, password },
      loginValidationRules
    );
    if (isValid) {
      loginFetch({ email, password });
    } else {
      const errorMessages = Object.values(errors)
        .map((error) => `${error}.`)
        .join("\n");
      showModal("Error", errorMessages, "error");
    }
  };

  const handleRegister = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const { isValid, errors } = validate(
      { name, email, password, confirmPassword },
      validationRules
    );
    if (isValid) {
      registerFetch({ name, email, password });
    } else {
      const errorMessages = Object.values(errors)
        .map((error) => `${error}.`)
        .join("\n");
      showModal("Error", errorMessages, "error");
    }
  };

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
