import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "w-full bg-transparent border-b border-soft-gray-medium/50 py-3 px-0 font-minimal text-sm text-matte-black placeholder:text-soft-gray-dark focus:border-accent focus:outline-none transition-colors",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-destructive text-xs mt-1 font-minimal">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };