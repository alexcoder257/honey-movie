import { NextAuthConfig } from "next-auth";
import facebook from "next-auth/providers/facebook";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOKK_CLIENT_SECRET,
      // authorization: {
      //   url: "https://www.facebook.com/v10.0/dialog/oauth",
      //   params: {
      //     scope: "public_profile",
      //     redirect_uri:
      //       "https://honey-movie.vercel.app/api/auth/callback/facebook",
      //   },
      // },
    }),
  ],
} satisfies NextAuthConfig;
