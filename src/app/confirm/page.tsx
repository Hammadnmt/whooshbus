"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Bus, MapPin, CalendarDays, Clock } from "lucide-react";

export default function BookingConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 px-4">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold">Booking Confirmed!</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Your trip has been successfully booked 🎉</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Trip Details */}
          <div className="bg-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">Trip Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Bus className="h-4 w-4 text-purple-600" />
                <span>WhooshBus Express</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span>From: Lahore → Islamabad</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-purple-600" />
                <span>Date: 15th Sept 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>Departure: 09:00 AM</span>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">Passenger Info</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Name:</span> Ali Khan
              </p>
              <p>
                <span className="font-semibold">Seat:</span> A12
              </p>
              <p>
                <span className="font-semibold">Ticket No:</span> #WB123456
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">Payment</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Amount Paid:</span> PKR 2,500
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span> JazzCash
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700">Download Ticket</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
