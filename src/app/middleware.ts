import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

export default function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies["adminToken"];

  console.log("Middleware initialized");
  console.log("Current path:", request.nextUrl.pathname);
  console.log("Token:", token);

  const protectedRoutes = [
    "/admin/home",
    "/admin/createAnat",
    "/admin/createSample",
  ];

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    !token
  ) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
