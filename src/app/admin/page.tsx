import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Bus,
  Users,
  Settings,
  ClipboardList,
  Pencil,
  Trash2,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">WhooshBus Admin</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#analytics" className="flex items-center gap-2 hover:text-gray-300">
            <BarChart3 className="h-5 w-5" /> Analytics
          </a>
          <a href="#trips" className="flex items-center gap-2 hover:text-gray-300">
            <Bus className="h-5 w-5" /> Trips
          </a>
          <a href="#bookings" className="flex items-center gap-2 hover:text-gray-300">
            <ClipboardList className="h-5 w-5" /> Bookings
          </a>
          <a href="#users" className="flex items-center gap-2 hover:text-gray-300">
            <Users className="h-5 w-5" /> Users
          </a>
          <a href="#settings" className="flex items-center gap-2 hover:text-gray-300">
            <Settings className="h-5 w-5" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>

        {/* Analytics */}
        <section id="analytics">
          <h3 className="text-xl font-semibold mb-4">Analytics</h3>
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Trips</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">128</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">542</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Revenue</CardTitle>
                <TrendingUp className="text-green-600" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">$24,320</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Completed Trips</CardTitle>
                <CalendarCheck className="text-blue-600" />
              </CardHeader>
              <CardContent className="text-3xl font-bold">93%</CardContent>
            </Card>
          </div>
        </section>

        {/* Trips Management */}
        <section id="trips">
          <h3 className="text-xl font-semibold mb-4">Manage Trips</h3>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Trips</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Today’s Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center border p-3 rounded-lg bg-gray-50">
                      <span>Lahore → Islamabad</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                    <li className="flex justify-between items-center border p-3 rounded-lg bg-gray-50">
                      <span>Karachi → Multan</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Bookings */}
        <section id="bookings">
          <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
          <Card>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between border-b pb-2">
                  <span>Ali Khan booked Lahore → Islamabad</span>
                  <span className="text-sm text-gray-500">2h ago</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Sara Ahmed booked Karachi → Multan</span>
                  <span className="text-sm text-gray-500">5h ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Users */}
        <section id="users">
          <h3 className="text-xl font-semibold mb-4">User Management</h3>
          <Card>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2">
                  <span>Ali Khan</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span>Sara Ahmed</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Settings */}
        <section id="settings">
          <h3 className="text-xl font-semibold mb-4">System Settings</h3>
          <Card>
            <CardContent className="space-y-4">
              <Button variant="outline">Update Pricing</Button>
              <Button variant="outline">Manage Buses</Button>
              <Button variant="outline">System Logs</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
