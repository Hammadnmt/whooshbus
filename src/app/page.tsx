"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bus, Star, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfa] via-[#f5f5fc] to-[#faf9f7] text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
        >
          Travel Smarter with <span className="text-[#541554]">WhooshBus</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 max-w-2xl text-lg text-gray-600"
        >
          Discover new journeys, book seats instantly, and enjoy hassle-free traveling across cities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Button
            size="lg"
            className="bg-[#541554] hover:bg-[#6a1b6e] text-white"
            onClick={() => router.push("/login")}
          >
            Book Your Trip <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Why Choose WhooshBus */}
      <section className="py-16 px-6 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            icon: <Bus className="h-10 w-10 text-[#541554]" />,
            title: "Comfortable Rides",
            desc: "Spacious seating, AC coaches, and smooth travel.",
          },
          {
            icon: <Star className="h-10 w-10 text-[#541554]" />,
            title: "Trusted Service",
            desc: "Thousands of happy travelers choose WhooshBus.",
          },
          {
            icon: <ArrowRight className="h-10 w-10 text-[#541554]" />,
            title: "Easy Booking",
            desc: "Book in seconds with instant seat confirmation.",
          },
        ].map((item, i) => (
          <Card key={i} className="shadow-md hover:shadow-lg transition rounded-2xl">
            <CardHeader className="flex items-center gap-3">
              {item.icon}
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Carousel / Destinations */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Destinations</h2>
        <div className="flex gap-6 overflow-x-auto no-scrollbar px-2">
          {["Lahore", "Karachi", "Islamabad", "Multan"].map((city, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="min-w-[250px] bg-gray-100 rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={`/${city}.jpg`}
                alt={city}
                width={400}
                height={250}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="font-semibold capitalize">{city}</h3>
                <p className="text-sm text-gray-600">Explore the beauty of {city} with WhooshBus.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-[#f5f5fc]">
        <h2 className="text-3xl font-bold text-center mb-10">What Travelers Say</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-3">
                    &quot;Amazing service! Seats were comfy and booking was super easy.&quot;
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 h-5 w-5" />
                    <span className="font-semibold">Ali Raza</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#541554] to-[#341234] text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 border-b border-white/20">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-2xl">WhooshBus</h3>
            <p className="text-sm mt-3 text-gray-300">
              Making travel simpler, smarter, and stress-free. Your journey, our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">Stay Updated</h4>
            <p className="text-sm text-gray-300 mb-3">
              Get the latest routes, offers, and updates straight to your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-l-lg text-white text-sm focus:outline-none w-full"
              />
              <Button className="bg-[#ffcb05] text-black px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-yellow-400 transition">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-300">© 2025 WhooshBus. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="p-2 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition">
              <Facebook className="h-5 w-5" />
            </span>
            <span className="p-2 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition">
              <Twitter className="h-5 w-5" />
            </span>
            <span className="p-2 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition">
              <Instagram className="h-5 w-5" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
