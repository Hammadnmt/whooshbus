"use client";
import React from "react";
import { BusSVG } from "../../public/busSVG";
import { Button } from "./ui/button";
import { Home, MapPin, Clock, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { on } from "events";

export default function NavigationBar() {
  const [toggleMenu, setToggleMenu] = React.useState<() => void>(() => {});
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  return (
    <div>
      <header className="sticky top-0 z-50 bg-[#541554] shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => router.push("/")}
          >
            <BusSVG width={40} height={40} />
            <span className="text-2xl font-bold text-white">BusPro</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Button variant="link" className="text-white hover:scale-105 transition-transform text-base">
              <Home className="mr-1 h-5 w-5" />
              Home
            </Button>
            <Button
              variant="link"
              className="text-white hover:scale-105 transition-transform text-base"
              onClick={() => router.push("/search")}
            >
              <MapPin className="mr-1 h-5 w-5" />
              Start Journey
            </Button>
            {/* Login / Profile */}
            <Button variant="link" className="text-white hover:scale-105 transition-transform text-base">
              <Clock className="mr-1 h-5 w-5" />
              Schedules
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 px-4 pb-4 text-white">
            <div className="flex flex-col gap-4">
              <Button
                variant="link"
                className="justify-start text-white"
                onClick={() => {
                  toggleMenu();
                  scrollTo(0);
                }}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
              <Button
                variant="link"
                className="justify-start text-white"
                onClick={() => {
                  toggleMenu();
                  scrollTo(500);
                }}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Start Journey
              </Button>
              <Button
                variant="link"
                className="justify-start text-white"
                onClick={() => {
                  toggleMenu();
                  scrollTo(1000);
                }}
              >
                <Clock className="mr-2 h-5 w-5" />
                Schedules
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
