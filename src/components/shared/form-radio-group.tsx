import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: RadioOption[];
  description?: string;
  required?: boolean;
  direction?: "vertical" | "horizontal";
}

export function FormRadioGroup<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  description,
  required = false,
  direction = "vertical",
}: FormRadioGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && "*"}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={
                direction === "horizontal"
                  ? "flex flex-row gap-4"
                  : "flex flex-col space-y-1"
              }
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
