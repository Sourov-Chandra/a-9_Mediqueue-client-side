import { NextResponse } from "next/server";

const privateRoutes = ["/add-tutor", "/my-tutors", "/my-bookings", "/tutors/"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("better-auth.session_token");

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivate && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-tutor", "/my-tutors", "/my-bookings", "/tutors/:path*"],
};
