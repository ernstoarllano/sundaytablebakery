import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";

export interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

export const Field = ({ label, htmlFor, error, children }: FieldProps) => {
  return (
    <BaseField.Root className="space-y-2">
      <BaseField.Label
        htmlFor={htmlFor}
        className="block text-sm font-bold uppercase tracking-wide"
      >
        {label}
      </BaseField.Label>
      {children}
      {error && (
        <BaseField.Error className="text-sm font-medium">
          {error}
        </BaseField.Error>
      )}
    </BaseField.Root>
  );
};
