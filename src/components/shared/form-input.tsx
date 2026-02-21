import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface FormInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  required = false,
  disabled = false,
  showButton = false,
  buttonLabel = "Search",
  onButtonClick,
}: FormInputProps<TFieldValues>) {
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
            {showButton ? (
              <ButtonGroup className="w-full">
                <Button variant="outline" type="button" onClick={onButtonClick}>
                  {buttonLabel}
                </Button>
                <Input
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  {...field}
                />
              </ButtonGroup>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
