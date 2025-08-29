// app/providers.tsx
"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"];
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
