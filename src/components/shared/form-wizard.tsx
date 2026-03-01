"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface FormWizardProps {
  steps: WizardStep[];
  children: ReactNode[];
  onValidate?: (stepIndex: number) => Promise<boolean>;
  className?: string;
}

export function FormWizard({
  steps,
  children,
  onValidate,
  className,
}: FormWizardProps) {
  const { theme } = useTheme();
  const t = useTranslations("Wizard");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = async () => {
    // Validate current step before proceeding
    if (onValidate) {
      const isValid = await onValidate(currentStep);
      if (!isValid) {
        return; // Don't proceed if validation fails
      }
    }

    // Move to next step
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    setCurrentStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    if (isFirstStep) {
      router.back();
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Steps */}
      <div className="mb-8 md:mb-12">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-border">
            <div
              className={cn(
                "h-full bg-linear-to-r transition-all duration-500 ease-in-out",
                theme.gradient.primary,
              )}
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Step Indicators */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = currentStep === index;
              const isClickable = index < currentStep || isCompleted;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  disabled={!isClickable}
                  className={cn(
                    "flex flex-col items-center group transition-all",
                    isClickable && "cursor-pointer hover:scale-105",
                    !isClickable && "cursor-not-allowed",
                  )}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 border-2",
                      isCurrent && [
                        "bg-linear-to-br border-transparent text-white shadow-lg scale-110",
                        theme.gradient.primary,
                      ],
                      isCompleted &&
                        !isCurrent && [
                          "bg-linear-to-br border-transparent text-white",
                          theme.gradient.primary,
                        ],
                      !isCurrent &&
                        !isCompleted &&
                        "bg-background border-border text-muted-foreground",
                    )}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-center hidden md:block">
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isCurrent && "text-foreground",
                        !isCurrent && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* Mobile Label */}
                  <div className="md:hidden">
                    <p
                      className={cn(
                        "text-xs font-medium transition-colors max-w-20 text-center",
                        isCurrent && "text-foreground",
                        !isCurrent && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-100 mb-6">{children[currentStep]}</div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t pt-4 pb-6 -mx-4 px-4 md:px-8">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {isFirstStep ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className={cn("cursor-pointer transition-all")}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t("cancel")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className={cn("cursor-pointer transition-all")}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t("previous")}
            </Button>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden md:inline">{t("step")}</span>
            <span className="font-semibold text-foreground">
              {currentStep + 1}
            </span>
            <span>/</span>
            <span>{steps.length}</span>
          </div>

          {isLastStep ? (
            <Button
              type="submit"
              className={cn(
                "cursor-pointer bg-linear-to-r text-white border-0 shadow-lg transition-all hover:scale-105",
                theme.gradient.primary,
              )}
            >
              {t("complete")}
              <Check className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className={cn(
                "cursor-pointer bg-linear-to-r text-white border-0 shadow-lg transition-all hover:scale-105",
                theme.gradient.primary,
              )}
            >
              {t("next")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
