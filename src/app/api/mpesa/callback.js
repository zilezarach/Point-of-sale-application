import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.log("Received callback data:", data);

  return NextResponse.json({ message: "Callback received successfully" });
}
