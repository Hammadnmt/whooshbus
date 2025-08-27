"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, MapPin, Navigation } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Search() {
  const [date, setDate] = useState<Date | null>(null);

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

  const searchTrips = () => {
    // TODO: implement search
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(field, value);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-[#f9f9ff] via-[#f5f5fc] to-[#f8f8f8]">
      {/* Background Travel Vibe */}
      <div className="absolute inset-0 bg-[url('/bus-pattern.svg')] bg-cover opacity-5 pointer-events-none" />

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16 mb-10 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Plan Your <span className="text-[#541554]">Journey</span> with Ease
        </h1>
        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          Book bus tickets in seconds. Choose your route, pick your date, and let{" "}
          <span className="font-semibold">WhooshBus</span> take you there 🚍.
        </p>
      </motion.div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 space-y-6"
      >
        <div className="flex flex-wrap justify-center gap-6">
          {/* Origin */}
          <Select name="Origin" onValueChange={(value) => handleInputChange("Origin", value)}>
            <SelectTrigger className="w-64 bg-white border-gray-300 shadow-sm hover:shadow-md transition">
              <MapPin className="w-4 h-4 mr-2 text-[#541554]" />
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
            <SelectTrigger className="w-64 bg-white border-gray-300 shadow-sm hover:shadow-md transition">
              <Navigation className="w-4 h-4 mr-2 text-[#541554]" />
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {TIME_ZONE.map((zone, index) => (
                <SelectItem key={index} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-48 flex justify-start items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="w-4 h-4 text-[#541554]" />
                {date ? format(date, "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={(selectedDate) => {
                  setDate(selectedDate ?? null);
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
            className="w-48 py-6 bg-[#541554] hover:bg-[#3f103f] text-white font-semibold text-lg shadow-lg rounded-xl"
          >
            Find My Trip 🚀
          </Button>
        </div>
      </motion.div>

      {/* Search Results Placeholder */}
      {/* <div className="w-full max-w-6xl mt-12">
        <Trip />
      </div> */}
    </div>
  );
}
