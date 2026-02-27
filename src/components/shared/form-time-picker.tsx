"use client";

import * as React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

function formatTime(time: string | undefined) {
  if (!time) {
    return "";
  }

  // Already in 12-hour format with AM/PM
  return time;
}

function format12Hour(hour: string, minute: string, period: string): string {
  return `${hour}:${minute} ${period}`;
}

interface FormTimePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

interface TimePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TimePickerInput({
  value,
  onChange,
  placeholder,
}: TimePickerInputProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = value ? formatTime(value) : "";

  // Parse current time for defaults
  const parseTime = (timeStr: string) => {
    if (!timeStr) {
      return { hour: "12", minute: "00", period: "AM" };
    }
    // Parse format "02:30 PM"
    const [time, period] = timeStr.split(" ");
    const [hour, mins] = time.split(":");
    return {
      hour: hour.padStart(2, "0"),
      minute: mins || "00",
      period: period || "AM",
    };
  };

  const parsedTime = parseTime(value);
  const [selectedHour, setSelectedHour] = React.useState(parsedTime.hour);
  const [selectedMinute, setSelectedMinute] = React.useState(parsedTime.minute);
  const [selectedPeriod, setSelectedPeriod] = React.useState(parsedTime.period);

  React.useEffect(() => {
    const parsed = parseTime(value);
    setSelectedHour(parsed.hour);
    setSelectedMinute(parsed.minute);
    setSelectedPeriod(parsed.period);
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const handleApply = () => {
    const time12 = format12Hour(selectedHour, selectedMinute, selectedPeriod);
    onChange(time12);
    setOpen(false);
  };

  return (
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
            aria-label="Select time"
          >
            <Clock className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-4"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <div className="space-y-4">
            <div className="text-sm font-medium text-center">Select Time</div>
            <div className="flex gap-2 items-center justify-center">
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-17.5">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-48">
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-xl font-semibold">:</span>

              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-17.5">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-48">
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-17.5">
                  <SelectValue placeholder="AM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              onClick={handleApply}
              className="w-full"
              size="sm"
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function FormTimePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select time",
  description,
  required = false,
}: FormTimePickerProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <TimePickerInput
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
