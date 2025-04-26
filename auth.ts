import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
export const config = {
  providers: [Google],
  pages: {
    signIn: "/login",
  },
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...config,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: { maxAge: 60 * 60 * 48 },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async signIn({ profile }) {
      console.log("this is profile", profile);
      if (!profile || !profile.email || !profile.name) {
        console.error("Profile is missing required fields");
        return false;
      }

      // Upsert the user and get the result which contains the MongoDB _id
      const user = await prisma.user.upsert({
        create: {
          email: profile.email as string,
          name: profile.name as string,
          image: profile.picture || "",
        },
        update: {
          email: profile.email as string,
          name: profile.name as string,
          image: profile.picture || "",
        },
        where: {
          email: profile.email as string,
        },
      });

      // Add the MongoDB _id to the profile
      profile._id = user.id;

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.account = account;
      }

      if (profile && profile._id) {
        // Store the MongoDB _id in the token
        token._id = profile._id;
      } else if (!token._id) {
        // If _id isn't in the token yet, try to fetch it from the database
        try {
          const user = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: { id: true },
          });

          if (user) {
            token._id = user.id;
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Pass the MongoDB _id to the session's user object
      if (token._id && session.user) {
        session.user.id = token._id;
      }

      return session;
    },
  },
});
