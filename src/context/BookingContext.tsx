"use client";

import { IBus, ISeatLayout } from "@/models/Bus";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface SeatSelection {
  busId: IBus["_id"];
  seat: ISeatLayout;
}

interface BookingContextType {
  seatData: SeatSelection[];
  addSeat: (data: SeatSelection) => void;
  removeSeat: (data: SeatSelection) => void;
  clearSeats: () => void;
  isReady: boolean; // ✅ tells client that hydration is complete
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [seatData, setSeatData] = useState<SeatSelection[]>([]);
  const [isReady, setIsReady] = useState(false);

  // ✅ Hydrate only after client mounts
  useEffect(() => {
    const saved = localStorage.getItem("bookingData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSeatData(parsed);
        } else {
          console.warn("bookingData in localStorage is not an array, resetting...");
          setSeatData([]);
        }
      } catch (err) {
        console.warn("Invalid bookingData in localStorage", err);
        setSeatData([]);
      }
    }
    setIsReady(true); // client mounted
  }, []);

  // Save whenever seatData changes (but only after mount)
  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(seatData));
  }, [seatData]);

  // const addSeat = (seat: string, gender: "male" | "female") => {
  //   setSeatData((prev) => {
  //     const exists = prev.find((s) => s.seat === seat);
  //     if (exists) {
  //       return prev.map((s) => (s.seat === seat ? { seat, gender } : s));
  //     }
  //     return [...prev, { seat, gender }];
  //   });
  // };
  const addSeat = (data: SeatSelection) => {
    setSeatData((prev) => {
      const exists = prev.find((s) => s.seat.seatNumber === data.seat.seatNumber && s.busId === data.busId);
      if (exists) {
        return prev.map((s) =>
          s.seat.seatNumber === data.seat.seatNumber && s.busId === data.busId
            ? { ...s, ...data } // ✅ this now includes updated gender
            : s
        );
      }

      return [...prev, data];
    });
  };

  const removeSeat = (data: SeatSelection) => {
    setSeatData((prev) => prev.filter((s) => s.seat._id !== data.seat._id));
  };

  const clearSeats = () => setSeatData([]);

  return (
    <BookingContext.Provider value={{ seatData, addSeat, clearSeats, removeSeat, isReady }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
};
