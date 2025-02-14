import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className="w-full px-3 py-2 text-sm rounded-md border-2 border-secondary/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
