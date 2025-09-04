"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface SeatSelection {
  seat: string;
  gender: "male" | "female";
}

interface BookingContextType {
  seatData: SeatSelection[];
  addSeat: (seat: string, gender: "male" | "female") => void;
  removeSeat: (seat: string) => void;
  clearSeats: () => void;
}

// -----------------
// Context
// -----------------
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [seatData, setSeatData] = useState<SeatSelection[]>([]);

  // Save to localStorage whenever seatData changes
  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(seatData));
  }, [seatData]);

  // -----------------
  // Handlers
  // -----------------
  const addSeat = (seat: string, gender: "male" | "female") => {
    setSeatData((prev) => {
      // if seat already selected, update gender
      const exists = prev.find((s) => s.seat === seat);
      if (exists) {
        return prev.map((s) => (s.seat === seat ? { seat, gender } : s));
      }
      return [...prev, { seat, gender }];
    });
  };

  const removeSeat = (seat: string) => {
    setSeatData((prev) => prev.filter((s) => s.seat !== seat));
  };

  const clearSeats = () => setSeatData([]);

  return (
    <BookingContext.Provider value={{ seatData, addSeat, removeSeat, clearSeats }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
};
