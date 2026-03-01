"use client";

import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CardDesignOption {
  value: string;
  label: string;
  imageUrl: string;
  description?: string;
}

interface FormCardGridSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  options: CardDesignOption[];
  itemsPerPage?: number;
  className?: string;
}

export function FormCardGridSelector<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
  itemsPerPage = 10,
  className,
}: FormCardGridSelectorProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const totalPages = Math.ceil(options.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOptions = options.slice(startIndex, endIndex);

  const handleSelect = (value: string) => {
    field.onChange(value);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Grid of card designs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentOptions.map((option) => {
          const isSelected = field.value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative group rounded-lg overflow-hidden transition-all duration-200",
                "border-2 hover:shadow-lg focus:outline-none focus:ring-2 cursor-pointer",
                isSelected
                  ? cn(
                      "border-primary ring-2 ring-ring/50 shadow-md",
                      "scale-[1.02]",
                    )
                  : "border-border hover:border-primary/50",
                "focus:ring-ring/50",
              )}
            >
              {/* Image Container */}
              <div className="aspect-3/4 relative bg-muted">
                <Image
                  src={option.imageUrl}
                  alt={option.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  )}
                />

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>

              {/* Label */}
              <div
                className={cn(
                  "py-2 px-3 text-center text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-accent text-primary"
                    : "bg-card text-card-foreground group-hover:bg-muted",
                )}
              >
                {option.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "p-2 rounded-md border transition-colors",
              currentPage === 1
                ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                : "border-border text-foreground hover:bg-muted",
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className={cn(
                "min-w-10 h-10 rounded-md font-medium transition-colors",
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-card-foreground hover:bg-muted",
              )}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 rounded-md border transition-colors",
              currentPage === totalPages
                ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                : "border-border text-foreground hover:bg-muted",
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  );
}
