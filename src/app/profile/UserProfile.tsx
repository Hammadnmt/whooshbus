"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, LogOut } from "lucide-react";
import { SessionProviderProps, signOut } from "next-auth/react";
import { toast } from "sonner";

export default function UserProfile({ session }: { session: SessionProviderProps["session"] }) {
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

        {/* Tabs */}
        {/* (keep your tabs code the same here, I didn’t repeat for brevity) */}
      </div>
    </div>
  );
}
