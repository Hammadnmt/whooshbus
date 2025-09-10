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
        const { email, password } = credentials as Credentials;
        const user = await authService.loginUser({ email, password });
        if (!user) return null;
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
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account?.provider == "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const [firstname, lastname] = user.name?.split(" ") ?? ["", ""];

          const newuser = await authService.registerOAuthUser({
            firstname,
            lastname,
            email: user.email as string,
            provider: account?.provider,
            providerId: account.providerAccountId,
            profilePicture: user.image,
          });
          if (!newuser) {
            return false;
          }
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
          image: token.image as string,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
