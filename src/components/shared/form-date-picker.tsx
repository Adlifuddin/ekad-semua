"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatToInputValue(date: Date | undefined) {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select a date",
  description,
  required = false,
}: FormDatePickerProps<TFieldValues>) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;
        const displayValue = field.value
          ? formatDate(new Date(field.value))
          : "";

        return (
          <FormItem>
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  value={displayValue}
                  placeholder={placeholder}
                  readOnly
                  onClick={() => setOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "Enter") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                  className="pr-10 cursor-pointer"
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      aria-label="Select date"
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(formatToInputValue(date));
                        }
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
