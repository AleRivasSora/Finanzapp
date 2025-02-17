import { useState } from "react";

export interface ValidationRule {
  field: string;
  method:
    | "required"
    | "minLength"
    | "maxLength"
    | "email"
    | "match"
    | "noSpecialChars"
    | "noSpaces"
    | "passwordComplexity";
  value?: any;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export function useFormValidator() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (
    formData: { [key: string]: any },
    rules: ValidationRule[]
  ): ValidationResult => {
    const newErrors: { [key: string]: string } = {};

    rules.forEach((rule) => {
      const fieldValue = formData[rule.field];

      switch (rule.method) {
        case "required":
          if (!fieldValue) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "minLength":
          if (fieldValue && fieldValue.length < rule.value) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "maxLength":
          if (fieldValue && fieldValue.length > rule.value) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (fieldValue && !emailRegex.test(fieldValue)) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "match":
          if (fieldValue !== formData[rule.value]) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "noSpecialChars":
          const specialCharsRegex = /[^a-zA-Z0-9 ]/g;
          if (fieldValue && specialCharsRegex.test(fieldValue)) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "noSpaces":
          if (fieldValue && /\s/.test(fieldValue)) {
            newErrors[rule.field] = rule.message;
          }
          break;
        case "passwordComplexity":
          const complexityRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (fieldValue && !complexityRegex.test(fieldValue)) {
            newErrors[rule.field] = rule.message;
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  return { errors, validate };
}
