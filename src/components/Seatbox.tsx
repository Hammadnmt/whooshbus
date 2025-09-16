"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SeatboxProps {
  seatNum: string;
  booked: boolean;
  held: boolean;
  available: boolean;
  gender?: "male" | "female" | null; // controlled by parent
  onSeatClick: (seatNumber: string, gender: "male" | "female") => void;
  isSelected: boolean;
}

const Seatbox = ({
  seatNum,
  booked = false,
  held = false,
  available = false,
  gender = null,
  onSeatClick,
}: SeatboxProps) => {
  let seatColor = booked
    ? "bg-red-100 text-red-700 border border-red-300 cursor-not-allowed"
    : held
    ? "bg-amber-100 text-amber-700 border border-amber-300 cursor-not-allowed"
    : available
    ? "bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 hover:shadow-md cursor-pointer"
    : "bg-gray-100 text-gray-700 border border-gray-300";

  // override with gender selection
  if (gender === "male") {
    seatColor = "bg-[#364F6B] text-white border border-[#2c3e50]";
  } else if (gender === "female") {
    seatColor = "bg-[#FC5185] text-white border border-[#e84874]";
  }

  // Disable popover for booked or held seats
  if (booked || held) {
    return (
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${seatColor}`}
      >
        {seatNum}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold cursor-pointer transition-all ${seatColor}`}
        >
          {seatNum}
        </div>
      </PopoverTrigger>

      <PopoverContent side="top" align="center" className="w-64">
        <p className="font-medium text-sm text-gray-700">Select Gender for Seat</p>
        <div className="flex justify-around gap-3 mt-3">
          {(["male", "female"] as const).map((g) => (
            <div
              key={g}
              className="text-center p-2 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSeatClick(seatNum, g); // only parent handles state
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-[18px] h-[18px] rounded ${g === "male" ? "bg-[#364F6B]" : "bg-[#FC5185]"}`}
                />
                <span className="text-sm text-gray-700">{g.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Seatbox;
