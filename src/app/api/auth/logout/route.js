import { NextResponse } from "next/server";

export async function POST(request) {
  // Invalidate the session or token here
  // For example, you might clear a session cookie or invalidate a JWT

  // Clear the cookie (assuming you use a cookie-based session)
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete("sessionToken"); // Replace with your cookie name
  return response;
}
