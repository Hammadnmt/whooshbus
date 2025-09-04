import { CirclePlus, CircleMinus, MapPin } from "lucide-react";
import React from "react";

interface Stop {
  _id: string;
  name: string;
  arrivalOffsetMin: number;
}

export default function Timeline({
  origin,
  destination,
  stops = [],
}: {
  origin: string;
  destination: string;
  stops?: Stop[];
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Vertical line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-300 z-0" />

      {/* Origin */}
      <div className="relative z-10 mb-12">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#541554] text-white shadow-lg">
          <CirclePlus size={20} />
        </div>
        <p className="mt-2 text-xs text-gray-600 text-center w-20">{origin}</p>
      </div>

      {/* Stops */}
      {stops.map((stop) => (
        <div key={stop._id} className="relative z-10 mb-12">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow">
            <MapPin size={16} />
          </div>
          <p className="mt-2 text-xs text-gray-600 text-center w-20">{stop.name}</p>
        </div>
      ))}

      {/* Destination */}
      <div className="relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e01e5a] text-white shadow-lg">
          <CircleMinus size={20} />
        </div>
        <p className="mt-2 text-xs text-gray-600 text-center w-20">{destination}</p>
      </div>
    </div>
  );
}
