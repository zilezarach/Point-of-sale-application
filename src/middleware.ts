import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const getCookies = () => new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware triggered for:", pathname);

  const protectedRoutes = ["/admin", "/POs"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;
    console.log("Token from cookie:", token);

    if (!token) {
      console.log("No token found. Redirecting to /Shop.");
      return NextResponse.redirect(new URL("/Shop", req.url));
    }
    try {
      const { payload } = await jwtVerify(token, getCookies());
      const userRole = (payload.role as string)?.toLowerCase();
      if (userRole !== "admin" && userRole !== "employee") {
        return NextResponse.redirect(new URL("/Shop", req.url));
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      return NextResponse.redirect(new URL("/Shop", req.url));
    }
    console.log("Token verified. Proceeding to protected route.");
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/POs/:path*"],
};
