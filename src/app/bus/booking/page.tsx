"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
export default function Page() {
  const [timeLeft, setTimeLeft] = useState(90000); // 15s for testing
  const [expired, setExpired] = useState(false);

  // 🔹 Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // 🔹 Form submit
  const onSubmit = (data: BookingFormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen w-full bg-purple-50 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Timer */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <span className="font-medium text-purple-700">Booking will expire in:</span>
            <span className="text-lg font-bold text-red-600">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input type="tel" placeholder="Phone Number" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input type="email" placeholder="Email Address" {...register("email")} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Select onValueChange={(val) => setValue("title", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mr</SelectItem>
                      <SelectItem value="mrs">Mrs</SelectItem>
                      <SelectItem value="ms">Ms</SelectItem>
                      <SelectItem value="dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                  <Input type="text" placeholder="First Name" {...register("firstName")} />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                </div>

                <div>
                  <Input type="text" placeholder="Last Name" {...register("lastName")} />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                </div>

                <div>
                  <Input type="date" {...register("dob")} />
                  {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
                </div>

                <div>
                  <Input type="text" placeholder="CNIC" {...register("cnic")} />
                  {errors.cnic && <p className="text-sm text-red-500">{errors.cnic.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#541554] hover:bg-[#3f103f]">
                Continue Booking
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side - Price Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Seats (2)</span>
                <span>PKR 2,000</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>PKR 200</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>PKR 2,200</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expired Booking Dialog */}
      <Dialog open={expired}>
        <DialogContent showCloseButton={false} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">Booking Expired</DialogTitle>
            <DialogDescription className="text-base text-center">
              Looks like your booking just went on vacation without you.
            </DialogDescription>
          </DialogHeader>
          <Button asChild className="mt-4 bg-[#541554] hover:bg-[#3f103f]">
            <Link href="/search">Back to Search</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
