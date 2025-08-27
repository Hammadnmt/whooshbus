"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowRight, Ticket } from "lucide-react";
import { DummySeatBox } from "./Seatbox";

export default function DummyTripCard() {
  const [showSeats, setShowSeats] = useState(false);
  console.log("Rendering Trip Card", showSeats);

  return (
    <Dialog>
      {/* Trip Card */}
      <Card className="mb-6 mt-6 border border-gray-200 rounded-2xl bg-white p-8 w-[90%] max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 p-0">
          {/* Route + Timings */}
          <div className="flex flex-col sm:flex-row gap-12 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
              <small className="text-gray-500 text-xs">12 Oct, 2025</small>
              <h4 className="text-gray-800 font-bold text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#541554]" /> 08:00 AM
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" /> Lahore
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
              <small className="text-gray-500 text-xs">12 Oct, 2025</small>
              <h4 className="text-gray-800 font-bold text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#541554]" /> 12:00 PM
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" /> Islamabad
              </p>
            </div>
          </div>

          {/* Fare Info */}
          <div className="flex flex-col gap-3 text-center border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex flex-col items-center">
              <Ticket className="h-6 w-6 text-green-600 mb-1" />
              <span className="text-gray-500 text-sm">Fare</span>
              <h5 className="text-gray-800 font-bold text-lg">PKR 1,500</h5>
              <p className="text-xs text-gray-500">Economy Class</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <DialogTrigger asChild>
              <Button
                className="bg-[#541554] hover:bg-[#3d0e3f] text-white font-semibold rounded-full px-8 py-3 shadow-lg transition-all duration-300"
                onClick={() => setShowSeats(true)}
              >
                Show Seats
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>

      {/* Seat Selection Dialog */}
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Select Your Seats</DialogTitle>
        </DialogHeader>

        {/* Dummy Seat Grid */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {Array.from({ length: 20 }, (_, i) => (
            <DummySeatBox key={i} seatNum={i + 1} />
          ))}
        </div>

        <DialogFooter>
          <Button className="bg-green-700 hover:bg-green-800 text-white">Proceed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
