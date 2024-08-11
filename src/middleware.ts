import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req):any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth as any;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if(nextUrl.pathname == "/"){
    return Response.redirect(new URL("/movie",nextUrl))
  }

  if (isApiAuthRoute || isPublicRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    if(nextUrl.pathname.split('/').includes('watch')){
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
