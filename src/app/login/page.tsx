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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, LoginData, RegisterData } from "@/lib/validations";

export default function Page() {
  const router = useRouter();

  // 🔹 Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  // 🔹 Register form
  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: regErrors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  async function handleLogin(data: LoginData) {
    try {
      const { email, password } = data;
      const res = await signIn("credentials", { email, password, callbackUrl: "/search", redirect: true });
      if (res?.ok) toast.success("Logged in successfully!");
      else toast.error("Login failed. Please check your credentials.");
    } catch (err) {
      toast.error("Login failed.");
    }
  }

  async function handleRegister(data: RegisterData) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      const result = await registerAction(formData);
      if (result?.success) {
        toast.success(result?.message);
        router.push("/login");
      } else {
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  }

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/search" })
      .then((res) => res?.ok && toast.success("Logged in with Google successfully!"))
      .catch(() => toast.error("Google login failed. Please try again."));
  };

  return (
    <div className="flex md:flex-row h-screen bg-gray-50">
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
                <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-gray-100"
                      {...loginRegister("email")}
                    />
                    {loginErrors.email && <p className="text-xs text-red-500">{loginErrors.email.message}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-100"
                      {...loginRegister("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-xs text-red-500">{loginErrors.password.message}</p>
                    )}
                  </div>
                  <Button className="w-full bg-[#611f69] hover:bg-[#531f5c]" type="submit">
                    Continue →
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" /> or continue with{" "}
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
                <form onSubmit={handleRegisterSubmit(handleRegister)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input placeholder="First Name" className="bg-gray-100" {...regRegister("fname")} />
                      {regErrors.fname && <p className="text-xs text-red-500">{regErrors.fname.message}</p>}
                    </div>
                    <div>
                      <Input placeholder="Last Name" className="bg-gray-100" {...regRegister("lname")} />
                      {regErrors.lname && <p className="text-xs text-red-500">{regErrors.lname.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Input placeholder="you@example.com" className="bg-gray-100" {...regRegister("email")} />
                    {regErrors.email && <p className="text-xs text-red-500">{regErrors.email.message}</p>}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-gray-100"
                      {...regRegister("password")}
                    />
                    {regErrors.password && (
                      <p className="text-xs text-red-500">{regErrors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <Input placeholder="Phone Number" className="bg-gray-100" {...regRegister("phone")} />
                    {regErrors.phone && <p className="text-xs text-red-500">{regErrors.phone.message}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-[#611f69] hover:bg-[#531f5c]">
                    Sign Up →
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex-1 h-px bg-gray-200" /> or continue with{" "}
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
