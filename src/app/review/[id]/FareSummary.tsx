"use client";

import FareSummarySkeleton from "@/components/FareSummarySkeleton";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { ITripPopulated } from "@/models/Trip";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function FareSummary({ trip }: { trip: ITripPopulated }) {
  const [loading, setLoading] = useState(false);
  const { seatData, isReady } = useBooking();

  useEffect(() => {
    if (!isReady) {
      Fallback();
    }
  }, [isReady]);
  function Fallback() {
    return <FareSummarySkeleton />;
  }

  const seats = seatData.filter((s) => s.busId === trip.bus._id).length;
  const total = trip.baseFare * seats;

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: trip.baseFare * seats, quantity: seats }),
    });
    const data = await res.json();
    console.log("checkout session", data);

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.data.id });
    setLoading(false);
  };

  return (
    <div className="w-full md:w-[30%] bg-[#fdfdfd] p-6 border-l border-gray-200 flex flex-col gap-4 shadow-inner relative">
      <h2 className="text-lg font-semibold text-gray-800">Fare Summary</h2>
      <div className="flex justify-between text-sm">
        <span>Seats Selected</span>
        <span suppressHydrationWarning>{seats}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Fare per Seat</span>
        <span>Rs. {trip.baseFare}</span>
      </div>
      <div className="flex justify-between text-base font-semibold border-t pt-2">
        <span>Total Amount</span>
        <span suppressHydrationWarning>Rs. {total}</span>
      </div>
      <Button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 bg-[#541554] hover:bg-[#3f103f] text-white py-6 rounded-xl"
      >
        {loading ? "Redirecting..." : "Proceed to Pay"}
      </Button>
    </div>
  );
}
