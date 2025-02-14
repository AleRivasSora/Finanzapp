import { ValidationRule } from "../hooks/useFormValidator";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validationRules: ValidationRule[] = [
  { field: "name", method: "required", message: "Name is required" },
  {
    field: "name",
    method: "noSpecialChars",
    message: "Name cannot contain special characters",
  },
  { field: "email", method: "required", message: "Email is required" },
  { field: "email", method: "email", message: "Invalid email address" },
  { field: "password", method: "required", message: "Password is required" },
  {
    field: "password",
    method: "minLength",
    value: 8,
    message: "Password must be at least 8 characters",
  },
  {
    field: "password",
    method: "maxLength",
    value: 20,
    message: "Password cannot be more than 20 characters",
  },
  {
    field: "password",
    method: "noSpaces",
    message: "Password cannot contain spaces",
  },
  {
    field: "password",
    method: "passwordComplexity",
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
  {
    field: "confirmPassword",
    method: "required",
    message: "Confirm Password is required",
  },
  {
    field: "confirmPassword",
    method: "match",
    value: "password",
    message: "Passwords do not match",
  },
  {
    field: "confirmPassword",
    method: "noSpaces",
    message: "Password cannot contain spaces",
  },
  {
    field: "confirmPassword",
    method: "maxLength",
    value: 20,
    message: "Password cannot be more than 20 characters",
  },
];

export const loginValidationRules: ValidationRule[] = [
  { field: "email", method: "required", message: "Email is required" },
  { field: "email", method: "email", message: "Invalid email address" },
  { field: "password", method: "required", message: "Password is required" },
  {
    field: "password",
    method: "minLength",
    value: 8,
    message: "Password must be at least 8 characters",
  },
  {
    field: "password",
    method: "maxLength",
    value: 20,
    message: "Password cannot be more than 20 characters",
  },
  {
    field: "password",
    method: "noSpaces",
    message: "Password cannot contain spaces",
  },
  {
    field: "password",
    method: "passwordComplexity",
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
];
