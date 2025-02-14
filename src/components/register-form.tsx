import { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, password, confirmPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <Input
          maxLength={20}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          style={{ top: "70%", transform: "translateY(-50%)" }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
        >
          Confirm Password
        </label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={toggleShowConfirmPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          style={{ top: "70%", transform: "translateY(-50%)" }}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Register
      </button>
      <p className="text-sm text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:underline"
        >
          Log In
        </button>
      </p>
    </form>
  );
}
