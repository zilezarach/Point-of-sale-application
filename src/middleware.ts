import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  role: string;
  username: string;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/admin", "/POs"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/Shop", req.url));
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decode === "object" && decode.role) {
        const userRole = decode.role as string;
        if (userRole !== "admin" && userRole !== "employee") {
          return NextResponse.redirect(new URL("/Shop", req.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/Shop", req.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/admin/:path*", "/POs/:path*"],
};
