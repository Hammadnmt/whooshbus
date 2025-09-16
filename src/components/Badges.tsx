"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SeatSelection, useBooking } from "@/context/BookingContext";

export default function Badges({ seatsData }: { seatsData: SeatSelection[] }) {
  const { removeSeat } = useBooking();

  return (
    <>
      {seatsData.map((s) => (
        <div key={s.seat._id} className="relative inline-block">
          <Badge
            className={cn(
              "relative text-sm flex items-center gap-1 pr-5",
              s.seat.gender === "male" ? "bg-[#364F6B]" : "bg-[#FC5185]"
            )}
          >
            {`${s.seat.seatNumber} ${s.seat.gender.charAt(0).toUpperCase()}`}
          </Badge>

          {/* ❌ Button */}
          <button
            onClick={() => removeSeat(s)}
            className="absolute -top-0 -right-1 w-4 h-4 flex items-center justify-center 
                       rounded-full bg-white text-red-700 text-xs font-bold shadow"
          >
            ✕
          </button>
        </div>
      ))}
    </>
  );
}
