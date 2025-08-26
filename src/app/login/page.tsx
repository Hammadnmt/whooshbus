"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleIcon from "../../../public/googleSvg";

export default function Page() {
  const [linkSent, setLinkSent] = useState(false);
  const handleLogin = () => {};
  const handleGoogleLogin = () => {};

  return (
    <div className="flex md:flex-row h-screen bg-gray-50">
      <div className="w-1/2 px-16 bg-gradient-to-br from-[#F3E8FF] to-[#EDE9FE] flex flex-col items-start justify-center">
        <h1 className="text-4xl font-bold text-[#611f69] mb-4">WhooshBus</h1>
        <h2 className="text-2xl font-semibold text-gray-800 leading-snug mb-2">Travel Smart, Travel Safe</h2>
        <p className="text-gray-600 text-sm">
          Join globle community of safe travlers
          <br />
          Build on relaibilty and transperency, and your satisfation.
        </p>
      </div>
      <div className="w-1/2  px-5 flex flex-col items-center justify-center">
        <Tabs defaultValue="Login" className="w-full max-w-md">
          <TabsList className="grid grid-cols-2 bg-gray-100 rounded-lg mb-6">
            <TabsTrigger
              value="Login"
              className="py-2 text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow transition"
            >
              Log in
            </TabsTrigger>
            <TabsTrigger
              value="Register"
              className="py-2 text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow transition"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="Login">
            <Card className="bg-white rounded-xl shadow-md">
              {linkSent ? (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-green-600">Email Sent</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-gray-600">
                    Check your inbox for a magic link to continue.
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">Sign in to WhooshBus</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      name="email"
                      placeholder="you@example.com"
                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      className="bg-gray-100"
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 mt-4">
                    <Button className="w-full bg-[#611f69] hover:bg-[#531f5c]" onClick={handleLogin}>
                      Continue →
                    </Button>
                    <Button
                      className="flex justify-center items-center gap-2 border rounded-md px-4 py-2 bg-white cursor-pointer hover:bg-accent"
                      onClick={handleGoogleLogin}
                    >
                      <GoogleIcon width={16} height={16} />
                      <span className="text-sm font-medium text-black">Continue with Google</span>
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="Register">
            <Card className="bg-white rounded-xl shadow-md">
              {linkSent ? (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-green-600">Email Sent</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-gray-600">
                    Check your inbox for a magic link to continue.
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      Create your WhooshBus account
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      name="email"
                      placeholder="you@example.com"
                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      className="bg-gray-100"
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 mt-4">
                    <Button className="w-full bg-[#611f69] hover:bg-[#531f5c]" onClick={handleLogin}>
                      Continue →
                    </Button>
                    <Button className="flex justify-center items-center gap-2 border rounded-md px-4 py-2 bg-white cursor-pointer hover:bg-accent">
                      <GoogleIcon width={16} height={16} />
                      <span className="text-sm font-medium text-black">Continue with Google</span>
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
