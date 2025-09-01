import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CrendentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/authService";

interface Credentials {
  email: string;
  password: string;
}
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SCRT!,
    }),
    CrendentialsProvider({
      name: "whoosh-login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hell0@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "*******" },
      },
      async authorize(credentials) {
        await connectDB();
        console.log("Login is here", credentials);
        const { email } = credentials as Credentials;
        const user = await authService.findUser(email);
        if (!user) {
          return null;
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account?.provider == "google") {
        const [firstName, lastName] = user.name?.split(" ") ?? ["", ""];
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
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("accound in jwt", account);
      console.log("user in jwt", user);

      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
