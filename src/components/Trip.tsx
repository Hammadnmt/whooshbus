"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface TripProps {
  id: string;
  description?: string;
  busNumber: string;
  totalSeats: number;
  source: string;
  destination: string;
  fare: number;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
}

type Seat = {
  seatNumber: number;
  gender: string;
};

export default function Trip({
  id,
  description,
  busNumber,
  totalSeats,
  source,
  destination,
  fare,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
}: TripProps) {
  return (
    <Dialog>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Select Seat Number</DialogTitle>
        </DialogHeader>
        <div>sds</div>
        <div className="mt-4 pt-4 border-t">
          <div className="container-fluid p-0">
            <h5 className="mb-4 text-primary">Select Your Seats</h5>
            <div className="grid grid-cols-5 gap-3 max-w-600px">hjd</div>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-900">Proceed</Button>
        </DialogFooter>
      </DialogContent>

      {/* Trip Card */}
      <div className="mb-6 mt-4 border border-gray-300 rounded-2xl bg-[#f9fafb] p-8 w-[90%] max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 shadow-lg">
        {/* Time Info */}
        <div className="flex flex-col sm:flex-row gap-12 border-b lg:border-b-0 lg:border-r border-gray-300 pb-6 lg:pb-0 lg:pr-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
            <small className="text-gray-500 text-xs">heh</small>
            <h4 className="text-gray-800 font-bold text-xl">dsds</h4>
            <small className="text-gray-600 text-sm">dsdsd</small>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <span className="text-gray-400 text-2xl">→</span>
          </div>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
            <small className="text-gray-500 text-xs">sas</small>
            <h4 className="text-gray-800 font-bold text-xl">sa</h4>
            <small className="text-gray-600 text-sm">dsd</small>
          </div>
        </div>

        {/* Fare Info */}
        <div className="flex flex-col gap-6 text-center border-b lg:border-b-0 lg:border-r border-gray-300 pb-6 lg:pb-0 lg:pr-8">
          <div>
            <span className="text-gray-500 text-sm">Fare</span>
            <h5 className="text-gray-800 font-bold text-lg">PKR</h5>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center">
          <DialogTrigger asChild>
            <Button
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full px-8 py-3 transition-all duration-300"
              //   onClick={() => setShowSeats(true)}
            >
              Show Seats
            </Button>
          </DialogTrigger>
        </div>
      </div>
    </Dialog>
  );
}
