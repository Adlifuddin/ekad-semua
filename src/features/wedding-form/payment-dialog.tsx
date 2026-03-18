"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (paymentRefId: string) => Promise<void>;
  qrCodeUrl?: string;
}

export function PaymentDialog({
  open,
  onOpenChange,
  onSubmit,
  qrCodeUrl = "/qr-code/ekad-semua-qr.jpeg",
}: PaymentDialogProps) {
  const [paymentRefId, setPaymentRefId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentRefId.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(paymentRefId);
      setPaymentRefId("");
    } catch (error) {
      console.error("Payment submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Scan the QR code to make payment, then enter your payment reference
            ID below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* QR Code Display */}
            <div className="flex justify-center py-4">
              <div className="relative w-64 h-64 border rounded-lg overflow-hidden">
                <Image
                  src={qrCodeUrl}
                  alt="Payment QR Code"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Payment Reference Input */}
            <div className="space-y-2">
              <Label htmlFor="paymentRefId">Payment Reference ID</Label>
              <Input
                id="paymentRefId"
                placeholder="Enter your payment reference ID"
                value={paymentRefId}
                onChange={(e) => setPaymentRefId(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !paymentRefId.trim()}
              className={cn(
                "bg-linear-to-r text-white cursor-pointer",
                theme.gradient.primary,
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
