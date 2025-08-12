import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({ message: "logged out" });
  response.cookies.set("token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });
  return response;
}
