import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user.name && token.name) {
        session.user.name = token.name;
      }
      if (session.user.email && token.email) {
        session.user.email = token.email;
      }
      if (session.user.image && token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
});
