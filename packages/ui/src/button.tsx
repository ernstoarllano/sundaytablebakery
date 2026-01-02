import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={`w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-black uppercase py-4 text-lg tracking-wide transition-colors duration-200 ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
