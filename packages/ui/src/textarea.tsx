import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-gray-200 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
