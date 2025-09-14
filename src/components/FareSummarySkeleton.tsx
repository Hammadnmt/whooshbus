"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function FareSummarySkeleton() {
  return (
    <div className="w-full md:w-[30%] bg-[#fdfdfd] p-6 border-l border-gray-200 flex flex-col gap-4 shadow-inner relative">
      <Skeleton className="h-5 w-32" /> {/* Title */}
      <div className="flex justify-between text-sm">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-8" />
      </div>
      <div className="flex justify-between text-sm">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex justify-between border-t pt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-12 w-full rounded-xl mt-6" /> {/* Button */}
    </div>
  );
}
