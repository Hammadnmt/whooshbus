"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { registerAction } from "../actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../../public/googleSvg";

export default function Page() {
  const router = useRouter();
  async function handleLogin(formData: FormData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      const res = await signIn("credentials", { email, password, callbackUrl: "/search", redirect: true });
      console.log("ress", res);
    } catch (error) {
      console.log("errro", error);
    }
  }
  async function handleRegister(formData: FormData) {
    try {
      const result = await registerAction(formData);
      console.log(result);
      if (result?.success) {
        toast.success(result?.message);
        router.push("/login");
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex md:flex-row h-screen bg-gray-50">
      {/* Left Section - Branding */}
      <div className="hidden md:flex w-1/2 px-16 bg-gradient-to-br from-[#F3E8FF] to-[#EDE9FE] flex-col items-start justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-[#611f69] mb-4">WhooshBus</h1>
          <h2 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
            Travel Smart, Travel Safe 🚍
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            Join a global community of safe travelers.
            <br />
            Built on reliability, transparency, and your satisfaction.
          </p>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute bottom-10 right-10 text-[#611f69] text-9xl font-black opacity-10 select-none"
        >
          ✦
        </motion.div>
      </div>

      {/* Right Section - Auth Forms */}
      <div className="w-full md:w-1/2 px-6 flex flex-col items-center justify-center">
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
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Sign in to WhooshBus</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Your journey starts here</p>
              </CardHeader>
              <CardContent>
                <form action={handleLogin} className="space-y-4">
                  <Input type="email" name="email" placeholder="you@example.com" className="bg-gray-100" />
                  <Input type="password" name="password" placeholder="••••••••" className="bg-gray-100" />
                  <Button className="w-full bg-[#611f69] hover:bg-[#531f5c]" type="submit">
                    Continue →
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-4">
                {/* Divider */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" />
                  or continue with
                  <span className="flex-1 h-px bg-gray-200" />
                </div>

                <Button
                  className="flex justify-center items-center gap-2 border rounded-md px-4 py-2 bg-white cursor-pointer hover:bg-accent"
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon width={16} height={16} />
                  <span className="text-sm font-medium text-black">Google</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="Register">
            <Card className="bg-white rounded-xl shadow-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Create your WhooshBus account
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Start your journey with us</p>
              </CardHeader>
              <CardContent>
                <form action={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="fname" placeholder="First Name" className="bg-gray-100" />
                    <Input name="lname" placeholder="Last Name" className="bg-gray-100" />
                  </div>
                  <Input name="email" placeholder="you@example.com" className="bg-gray-100" />
                  <Input type="password" name="password" placeholder="Password" className="bg-gray-100" />
                  <Input name="phone" placeholder="Phone Number" className="bg-gray-100" />
                  <Button type="submit" className="w-full bg-[#611f69] hover:bg-[#531f5c]">
                    Sign Up →
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" />
                  or continue with
                  <span className="flex-1 h-px bg-gray-200" />
                </div>

                <Button
                  className="flex justify-center items-center gap-2 border rounded-md px-4 py-2 bg-white cursor-pointer hover:bg-accent"
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon width={16} height={16} />
                  <span className="text-sm font-medium text-black">Google</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
