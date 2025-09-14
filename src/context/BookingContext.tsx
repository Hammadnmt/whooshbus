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

  const addSeat = (seat: string, gender: "male" | "female") => {
    setSeatData((prev) => {
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
    <BookingContext.Provider value={{ seatData, addSeat, removeSeat, clearSeats, isReady }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
};
