import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "w-full bg-transparent border-b border-soft-gray-medium/50 py-3 px-0 font-minimal text-sm text-ghost-white placeholder:text-ghost-white/50 focus:border-accent focus:outline-none transition-colors resize-none",
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

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };