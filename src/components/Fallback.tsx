import { Bus } from "lucide-react";
import React from "react";

export default function Fallback() {
  return (
    <div className="min-h-dvh flex justify-center content-center items-center bg-amber-500">
      <div className="h-[50%] w-[40%] flex justify-center items-center gap-[1.5rem]">
        <Bus size={50} className="animate-bounce" />
        <h1 className="text-3xl font-semibold">WhooshBus</h1>
      </div>
    </div>
  );
}
