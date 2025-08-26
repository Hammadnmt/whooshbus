"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Timeline from "@/components/ui/timeline";

export default function TripReview() {
  return (
    <div className="p-4 bg-[#f8f8f8] min-h-screen">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-2 bg-[#541554] p-6 rounded-t-2xl text-white">
          <h2 className="text-3xl font-bold">Review Your Trip</h2>
          <p className="text-white/70 text-sm">Check your travel details</p>
        </div>

        {/* Body */}
        <div className="flex flex-col mt-4 md:flex-row bg-white rounded-b-2xl overflow-hidden shadow-md">
          {/* Left side: Trip Info */}
          <div className="w-full md:w-[70%] p-6">
            {/* Operator */}
            <div className="flex items-center gap-4 text-[#541554] font-semibold text-lg mb-6">
              <span>🚍</span>
              <span>Daewoo Express</span>
            </div>

            {/* Timeline */}
            <div className="flex items-start gap-6 mb-6">
              <Timeline />
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-gray-800">ds</h3>
                  <h4 className="text-gray-600 text-sm">sas</h4>
                </div>
                <div>
                  <h3 className="text-gray-800">dsd</h3>
                  <h4 className="text-gray-600 text-sm">as</h4>
                </div>
              </div>
            </div>

            {/* Trip Labels */}
            <div className="flex gap-4 mb-6">
              <Badge className="bg-[#f0f0fd] text-[#3a36e0] text-sm font-medium">Luxury</Badge>
              <Badge className="bg-[#e9f9ee] text-[#28a745] text-sm font-medium">Refundable</Badge>
            </div>

            {/* Additional Info */}
            <div className="bg-[#f0f0fd] p-4 rounded-lg w-full md:w-[70%] mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="opacity-50">Pickup Point</span>
                <span>Point</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-50">Travel Duration</span>
                <span>sas hrs</span>
              </div>
            </div>
          </div>

          {/* Right side: Fare Summary */}
          <div className="w-full md:w-[30%] bg-[#f5f5fc] p-2 border-l border-gray-200 flex flex-col gap-6">
            sas
          </div>
        </div>
      </div>
    </div>
  );
}
