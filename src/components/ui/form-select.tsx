import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: { value: string; label: string }[];
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            "w-full bg-transparent border-b border-soft-gray-medium/50 py-3 px-0 font-minimal text-sm text-ghost-white focus:border-accent focus:outline-none transition-colors",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-matte-black text-ghost-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-destructive text-xs mt-1 font-minimal">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export { FormSelect };