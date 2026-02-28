import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotFoundContentProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function NotFoundContent({
  title = "404 - Not Found",
  message = "Sorry, we couldn't find what you're looking for.",
  showHomeButton = true,
}: NotFoundContentProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-muted-foreground max-w-md">{message}</p>
        {showHomeButton && (
          <div className="pt-4">
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
