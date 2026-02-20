import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface FieldConfig {
  name: string;
  placeholder: string;
  type?: string;
}

interface DynamicFieldItem {
  id: string;
  [key: string]: string;
}

interface FormDynamicFieldProps<T extends DynamicFieldItem> {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string) => void;
  fields: FieldConfig[];
  addButtonText?: string;
  minItems?: number;
}

export function FormDynamicField<T extends DynamicFieldItem>({
  items,
  onAdd,
  onRemove,
  onUpdate,
  fields,
  addButtonText = "Add Item",
  minItems = 1,
}: FormDynamicFieldProps<T>) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-2 items-start">
          <div className={`flex-1 grid md:grid-cols-${fields.length} gap-2`}>
            {fields.map((field) => (
              <div key={field.name}>
                <Input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={item[field.name] || ""}
                  onChange={(e) =>
                    onUpdate(item.id, field.name, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          {items.length > minItems && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
}
