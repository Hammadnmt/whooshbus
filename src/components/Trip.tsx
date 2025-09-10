"use client";
import { useRouter } from "next/navigation";
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
import { format } from "date-fns";
import { ITripPopulated } from "@/models/Trip";
import { ISeatLayout } from "@/models/Bus";
import { useBooking } from "@/context/BookingContext"; // ✅ import context
import { seatHoldAction } from "@/app/actions/seatHoldAction";
import { toast } from "sonner";

export default function TripCard({ trip }: { trip: ITripPopulated }) {
  const { seatData, addSeat } = useBooking();
  // const router = useRouter();
  const handleProceed = async () => {
    if (seatData.length === 0) return; // optional: prevent proceeding without selection
    const result = await seatHoldAction(trip._id, seatData);
    if (result.success) {
      toast.success(result.message);
    }

    // router.push(`/review/${trip._id}`);
  };

  // Format timings
  const depDate = new Date(trip.departureAt);
  const arrDate = new Date(trip.arrivalAt);

  return (
    <Dialog>
      {/* Trip Card */}
      <Card className="mb-6 mt-6 border border-gray-200 rounded-2xl bg-white p-8 w-full max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 p-0">
          {/* Route + Timings */}
          <div className="flex flex-col sm:flex-row gap-12 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8">
            {/* Departure */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
              <small className="text-gray-500 text-xs">{format(depDate, "dd MMM, yyyy")}</small>
              <h4 className="text-gray-800 font-bold text-lg flex items-center self-stretch gap-1">
                <Clock className="h-5 w-5 text-[#541554]" /> {format(depDate, "hh:mm")}
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" /> {trip.route?.originStation}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-gray-400" />
            </div>

            {/* Arrival */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
              <small className="text-gray-500 text-xs">{format(arrDate, "dd MMM, yyyy")}</small>
              <h4 className="text-gray-800 font-bold text-lg flex items-center gap-1">
                <Clock className="h-5 w-5 text-[#541554]" /> {format(arrDate, "hh:mm")}
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" /> {trip.route?.destinationStation}
              </p>
            </div>
          </div>

          {/* Fare Info */}
          <div className="flex flex-col gap-3 text-center border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex flex-col items-center">
              <Ticket className="h-6 w-6 text-green-600 mb-1" />
              <span className="text-gray-500 text-sm">Fare</span>
              <h5 className="text-gray-800 font-bold text-lg">PKR {trip.baseFare}</h5>
              <p className="text-xs text-gray-500">{trip.bus.seatLayout[0]?.class ?? "Economy"}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <DialogTrigger asChild>
              <Button className="bg-[#541554] hover:bg-[#3d0e3f] text-white font-semibold rounded-full px-4 py-3 shadow-lg transition-all duration-300">
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

        {/* Seat Grid */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {trip.bus.seatLayout.map((seat: ISeatLayout) => {
            const currentSeat = seatData.find((s) => s.seat === seat.seatNumber);
            return (
              <DummySeatBox
                key={seat._id?.toString()}
                seatNum={seat.seatNumber}
                gender={currentSeat?.gender}
                isSelected={!!currentSeat}
                onSeatClick={addSeat}
              />
            );
          })}
        </div>

        <DialogFooter>
          <Button onClick={handleProceed} className="bg-green-700 hover:bg-green-800 text-white">
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
