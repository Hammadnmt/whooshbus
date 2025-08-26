"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
export default function page() {
  const [date, setDate] = useState(null);
  const TIME_ZONE = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Daska",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
  ];
  const searchTrips = () => {};

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <div className="w-full max-w-6xl p-8 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-6">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Origin */}
          <Select name="Origin" onValueChange={(value) => handleInputChange("Origin", value)}>
            <SelectTrigger className="w-64 bg-white border-gray-300 shadow-sm">
              <SelectValue placeholder="Select Origin" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {TIME_ZONE.map((zone, index) => (
                <SelectItem key={index} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Destination */}
          <Select name="Destination" onValueChange={(value) => handleInputChange("Destination", value)}>
            <SelectTrigger className="w-64 bg-white border-gray-300 shadow-sm">
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            {/* <SelectContent className="max-h-60">{filteredDestination()}</SelectContent> */}
          </Select>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-48 flex justify-start items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm transition",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="w-4 h-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  handleInputChange("date", selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <Button
            onClick={searchTrips}
            className="w-40 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-sm"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
