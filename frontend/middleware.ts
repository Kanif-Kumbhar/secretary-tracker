import NextAuth, { NextAuthRequest } from "next-auth";

import { NextResponse } from "next/server";
import AuthConfig from "./auth.config";
import { apiAuthPrefix } from "./routes";
const { auth } = NextAuth(AuthConfig);

export default auth(async (request: NextAuthRequest) => {
  const { nextUrl, auth } = request;
  const loggedIn = !!auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminAuthRoute = nextUrl.pathname.startsWith("/admin");
  const isTeacherAuthRoute = nextUrl.pathname.startsWith("/teacher");
  const isSecretaryAuthRoute = nextUrl.pathname.startsWith("/secretary");

  if (isApiAuthRoute) {
    return;
  }
  if (
    !loggedIn &&
    (isAdminAuthRoute || isTeacherAuthRoute || isSecretaryAuthRoute)
  ) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  //   Used to Invoke the Middleware
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
