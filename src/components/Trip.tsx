"use client";
import { useEffect, useState } from "react";
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
import Seatbox from "./Seatbox";
import { format } from "date-fns";
import { ITripPopulated } from "@/models/Trip";
import { useBooking } from "@/context/BookingContext";
import { seatHoldAction } from "@/app/actions/seatHoldAction";
import { getHeldSeats } from "@/app/actions/getHeldSeats";
import { toast } from "sonner";
import SeatLegend from "./SeatLegend";
import Badges from "./Badges";

export default function TripCard({ trip }: { trip: ITripPopulated }) {
  const { seatData, addSeat } = useBooking();
  const router = useRouter();
  const [heldSeats, setHeldSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  // fetch held seats
  useEffect(() => {
    async function fetchHeld() {
      const result = await getHeldSeats(trip._id);
      if (result.success && result.data) {
        setHeldSeats(result.data.map((s) => s.seatNumber));
      } else {
        toast.error(result.message || "Failed to fetch held seats");
      }
    }
    fetchHeld();
    const interval = setInterval(fetchHeld, 30000);
    return () => clearInterval(interval);
  }, [trip._id]);

  // TODO: Replace this with API call to fetch real booked seats
  useEffect(() => {
    setBookedSeats(["1A", "2A", "5A", "6A", "7A"]); // demo data
  }, []);

  const handleProceed = async () => {
    if (seatData.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    const result = await seatHoldAction(trip._id, seatData);
    if (result.success) {
      toast.success(result.message);
      router.push(`/review/${trip._id}`);
    } else {
      toast.error(result.message || "Failed to hold seats");
    }
  };

  // Format timings
  const depDate = new Date(trip.departureAt);
  const arrDate = new Date(trip.arrivalAt);

  const bookedSet = new Set(bookedSeats);
  const heldSet = new Set(heldSeats);
  const selectedSet = new Set(seatData.filter((s) => s.busId === trip.bus._id).map((s) => s.seat._id));

  const finalSeats = trip.bus.seatLayout.map((seat) => {
    return {
      ...seat, // includes _id, seatNumber, etc.
      booked: bookedSet.has(seat.seatNumber),
      held: heldSet.has(seat.seatNumber),
      available: !bookedSet.has(seat.seatNumber) && !heldSet.has(seat.seatNumber),
      selected: selectedSet.has(seat._id),
      gender: seatData.find((s) => s.seat._id === seat._id)?.seat.gender,
    };
  });

  return (
    <Dialog>
      <Card className="mb-6 mt-6 border border-gray-200 rounded-2xl bg-white p-8 w-full max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 p-0">
          {/* timings */}
          <div className="flex flex-col sm:flex-row gap-12 border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0 lg:pr-8">
            {/* Departure */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
              <small className="text-gray-500 text-xs" suppressHydrationWarning>
                {format(depDate, "dd MMM, yyyy")}
              </small>
              <h4
                className="text-gray-800 font-bold text-lg flex items-center self-stretch gap-1"
                suppressHydrationWarning
              >
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
              <small className="text-gray-500 text-xs" suppressHydrationWarning>
                {format(arrDate, "dd MMM, yyyy")}
              </small>
              <h4
                className="text-gray-800 font-bold text-lg flex items-center gap-1"
                suppressHydrationWarning
              >
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
        <SeatLegend />
        {/* Seat Grid */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {finalSeats.map((seat) => (
            <Seatbox
              busId={trip.bus._id}
              seat={seat}
              available={seat.available}
              booked={seat.booked}
              held={seat.held}
              isSelected={seat.selected}
              gender={seat.gender}
              onSeatClick={addSeat}
              seatNum={seat.seatNumber}
              key={`${trip.bus._id}-${seat._id}`} // ✅ unique key per bus+seat
            />
          ))}
        </div>

        <DialogFooter>
          <div className="flex flex-wrap gap-2 mr-auto">
            <Badges seatsData={seatData} />
          </div>
          <Button onClick={handleProceed} className="bg-green-700 hover:bg-green-800 text-white">
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
