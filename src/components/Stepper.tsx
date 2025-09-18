"use client";

import { Bus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Booking", icon: <Bus className="w-4 h-4" /> },
  { id: 2, label: "Payment" },
  { id: 3, label: "Confirmation" },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto px-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1 flex items-center">
          {/* Circle */}
          <div className="relative flex flex-col items-center text-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2",
                currentStep === step.id
                  ? "bg-blue-500 border-blue-500 text-white"
                  : currentStep > step.id
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 text-gray-400"
              )}
            >
              {step.icon ? step.icon : step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-sm",
                currentStep >= step.id ? "text-black font-medium" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn("flex-1 h-0.5 mx-2", currentStep > step.id ? "bg-green-500" : "bg-gray-300")}
            />
          )}
        </div>
      ))}
    </div>
  );
}
