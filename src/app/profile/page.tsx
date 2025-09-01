"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, Phone, Calendar, MapPin, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function UserProfile() {
  const { data: session } = useSession();
  console.log(session);
  function handleLogout() {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
    toast.success("Logged out successfully");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-background p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <Card className="relative backdrop-blur-md bg-white/70 shadow-md rounded-2xl border border-gray-200">
          <CardContent className="flex items-center gap-6 p-6">
            <Avatar className="h-20 w-20 ring-4 ring-primary/10">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold tracking-tight">{session?.user?.name}</h2>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Gold Member</Badge>
                <Badge variant="outline">50+ Bookings</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
              <Button variant="destructive" size="sm" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info + Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="recent">Recent Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
          </TabsList>

          {/* Recent */}
          <TabsContent value="recent">
            <Card className="backdrop-blur-md bg-white/70 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Lahore → Karachi</p>
                    <p className="text-sm text-muted-foreground">July 20, 2025</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Islamabad → Multan</p>
                    <p className="text-sm text-muted-foreground">June 15, 2025</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming */}
          <TabsContent value="upcoming">
            <Card className="backdrop-blur-md bg-white/70 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Karachi → Quetta</p>
                    <p className="text-sm text-muted-foreground">Sept 05, 2025 | Seat 14A</p>
                  </div>
                  <Badge>Confirmed</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Info */}
          <TabsContent value="personal">
            <Card className="backdrop-blur-md bg-white/70 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>hammad.ali@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+92 300 1234567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Joined: March 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Lahore, Pakistan</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
