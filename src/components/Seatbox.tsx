"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DummySeatBoxProps {
  seatNum: string;
  reserved?: boolean;
  gender?: "male" | "female" | null;
  isSelected?: boolean;
  onSeatClick?: (event: React.MouseEvent, seatNumber: string) => void;
  onGenderSelect?: (gender: "male" | "female") => void;
}

export const DummySeatBox = ({
  seatNum,
  reserved = false,
  gender = null,
  isSelected = false,
  onSeatClick = () => {},
  onGenderSelect = () => {},
}: DummySeatBoxProps) => {
  const seatColor =
    reserved || isSelected
      ? gender === "male"
        ? "bg-[#364F6B] text-white"
        : "bg-[#FC5185] text-white"
      : "bg-[#F5F5F5] text-gray-800";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold cursor-pointer transition-all ${seatColor}`}
          onClick={(e) => onSeatClick(e, seatNum)}
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
              onClick={() => onGenderSelect(g)}
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
