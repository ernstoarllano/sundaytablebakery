import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={`w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-gray-200 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
