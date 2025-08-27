"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { ShieldCheck, Star, RefreshCcw } from "lucide-react";

export default function TripReview() {
  return (
    <div className="p-4 bg-[#f8f8f8] min-h-screen">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-2 bg-gradient-to-r from-[#541554] to-[#341234] p-8 rounded-t-2xl text-white shadow-lg">
          <h2 className="text-3xl font-bold">Review Your Trip</h2>
          <p className="text-white/70 text-sm">Double-check your travel details before proceeding</p>
        </div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col mt-4 md:flex-row bg-white rounded-b-2xl overflow-hidden shadow-xl"
        >
          {/* Left side: Trip Info */}
          <div className="w-full md:w-[70%] p-6">
            {/* Operator */}
            <div className="flex items-center gap-4 text-[#541554] font-semibold text-lg mb-6">
              <span className="text-2xl">🚍</span>
              <span>Daewoo Express</span>
            </div>

            {/* Timeline */}
            <div className="flex items-start gap-6 mb-6">
              <Timeline />
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-gray-800 font-semibold">Lahore</h3>
                  <h4 className="text-gray-600 text-sm">Departure: 10:00 AM</h4>
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold">Islamabad</h3>
                  <h4 className="text-gray-600 text-sm">Arrival: 02:30 PM</h4>
                </div>
              </div>
            </div>

            {/* Trip Labels */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <Badge className="bg-[#f0f0fd] text-[#3a36e0] text-sm font-medium flex items-center gap-1">
                <Star className="h-4 w-4" /> Luxury
              </Badge>
              <Badge className="bg-[#e9f9ee] text-[#28a745] text-sm font-medium flex items-center gap-1">
                <RefreshCcw className="h-4 w-4" /> Refundable
              </Badge>
              <Badge className="bg-[#fff8e5] text-[#d97706] text-sm font-medium flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Safe Travel
              </Badge>
            </div>

            {/* Additional Info */}
            <div className="bg-[#f0f0fd] p-4 rounded-lg w-full md:w-[70%] mb-6 shadow-sm">
              <div className="flex justify-between mb-2 text-sm">
                <span className="opacity-60">Pickup Point</span>
                <span>Lahore Terminal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Travel Duration</span>
                <span>4 hrs 30 mins</span>
              </div>
            </div>
          </div>

          {/* Right side: Fare Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full md:w-[30%] bg-[#fdfdfd] p-6 border-l border-gray-200 flex flex-col gap-4 shadow-inner relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#541554] to-[#ffcb05]" />
            <h2 className="text-lg font-semibold text-gray-800">Fare Summary</h2>

            <div className="flex justify-between text-sm text-gray-700">
              <span>Seats Selected</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Fare per Seat</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-2">
              <span>Total Amount</span>
              <span>$100</span>
            </div>

            <Button className="mt-6 bg-[#541554] hover:bg-[#3f103f] text-white py-6 rounded-xl text-lg shadow-lg">
              Proceed to Pay
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
