'use client'

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, defaultValue, onValueChange, options = [], placeholder = "Select an option", className = "", disabled = false }, ref) => {
    return (
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <BaseSelect.Trigger
          ref={ref}
          className={`w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-gray-200 text-left flex justify-between items-center ${className}`}
        >
          <BaseSelect.Value className="flex-1">
            {(val) => {
              const selectedOption = options.find((opt) => opt.value === val);
              return (
                <span className={selectedOption ? "" : "text-gray-500"}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
              );
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon className="ml-2">▼</BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4} align="end" arrowPadding={0}>
            <BaseSelect.Popup className="w-[var(--anchor-width)] border-2 border-black bg-white shadow-lg max-h-60 overflow-auto z-50">
              <BaseSelect.List className="outline-none">
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer data-[highlighted]:bg-gray-100"
                  >
                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    );
  }
);

Select.displayName = "Select";
