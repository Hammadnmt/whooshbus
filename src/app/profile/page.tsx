"use client";

import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <UserProfile session={session} />;
}
