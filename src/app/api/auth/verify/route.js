import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const cookiesHeader = request.headers.get("cookie") || "";
    const tokenCookie = cookiesHeader
      .split(";")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const body = await request.json().catch(() => ({}));
    const token = tokenCookie || body.token;
    if (!token) {
      return NextResponse.json({ valid: false, message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      valid: true,
      user: decoded,
    });
  } catch (err) {
    return NextResponse.json({ valid: false, message: "Invalid token" });
  }
}
