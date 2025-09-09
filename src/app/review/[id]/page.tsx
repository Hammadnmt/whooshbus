// app/review/[id]/page.tsx
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Star, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import FareSummary from "./FareSummary";
import { ITripPopulated } from "@/models/Trip";

// tell Next.js this is server-rendered & fresh
export const dynamic = "force-dynamic";

interface IStops {
  name: string;
  arrivalOffsetMin: number;
}

async function getTrip(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${id}`, {
    cache: "no-store", // disable caching for always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch trip");
  }

  const data = await res.json();
  return data.data; // your trip object
}

export default async function TripReview({ params }: { params: { id: string } }) {
  const trip: ITripPopulated = await getTrip(params.id);

  return (
    <div className="p-4 bg-[#f8f8f8] min-h-screen">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-2 bg-gradient-to-r from-[#541554] to-[#341234] p-8 rounded-t-2xl text-white shadow-lg">
          <h2 className="text-3xl font-bold">Review Your Trip</h2>
          <p className="text-white/70 text-sm">Double-check your travel details before proceeding</p>
        </div>

        {/* Body */}
        <div className="flex flex-col mt-4 md:flex-row bg-white rounded-b-2xl overflow-hidden shadow-xl">
          {/* Left side: Trip Info */}
          <div className="w-full md:w-[70%] p-6">
            {/* Operator */}
            <div className="flex items-center gap-4 text-[#541554] font-semibold text-lg mb-6">
              <span className="text-2xl">🚍</span>
              <span>
                {trip.bus.model} ({trip.bus.regNumber})
              </span>
            </div>

            {/* Timeline */}
            <div className="flex items-start gap-6 mb-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-gray-800 font-semibold">{trip.route.originStation}</h3>
                  <h4 className="text-gray-600 text-sm">
                    Departure: {format(new Date(trip.departureAt), "hh:mm a")}
                  </h4>
                </div>
                {trip?.route?.stops?.map((stop: IStops) => (
                  <div key={stop.name}>
                    <h3 className="text-gray-800 font-semibold">{stop.name}</h3>
                    <h4 className="text-gray-600 text-sm">Stop after {stop.arrivalOffsetMin / 60} hrs</h4>
                  </div>
                ))}
                <div>
                  <h3 className="text-gray-800 font-semibold">{trip.route.destinationStation}</h3>
                  <h4 className="text-gray-600 text-sm">
                    Arrival: {format(new Date(trip.arrivalAt), "hh:mm a")}
                  </h4>
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
                <span>{trip.route.originStation} Terminal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Travel Duration</span>
                <span>{Math.floor(trip?.route?.approxDurationMin ?? 0 / 60)} hrs</span>
              </div>
            </div>
          </div>

          {/* Right side: Fare Summary */}
          <FareSummary trip={trip} />
        </div>
      </div>
    </div>
  );
}
