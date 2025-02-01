import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  role: string;
  username: string;
}

export function middleware(req: NextRequest) {
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
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as MyJwtPayload;
      console.log("Decoded token:", decoded);
      if (decoded && decoded.role) {
        const userRole = decoded.role.toLowerCase();
        if (userRole !== "admin" && userRole !== "employee") {
          console.log("User role not authorized:", userRole);
          return NextResponse.redirect(new URL("/Shop", req.url));
        }
      } else {
        console.log("Token does not have a role field. Redirecting.");
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
