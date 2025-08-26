import { CirclePlus, CircleMinus } from "lucide-react";
import React from "react";

export default function Timeline() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Vertical line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-300 z-0" />

      {/* Start Point */}
      <div className="relative z-10 mb-20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#541554] text-white shadow-lg">
          <CirclePlus size={20} />
        </div>
      </div>

      {/* End Point */}
      <div className="relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e01e5a] text-white shadow-lg">
          <CircleMinus size={20} />
        </div>
      </div>
    </div>
  );
}
