import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SCRT!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      const firstName = user.name?.split(" ")[0];
      const lastName = user.name?.split(" ")[1];

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          firstName,
          lastName,
          email: user.email,
          profilePicture: user.image,
          provider: account?.provider,
          providerId: account?.providerAccountId,
        });
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
