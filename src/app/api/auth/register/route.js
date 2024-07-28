import { NextResponse } from "next/server";
import { registerUser } from "../../../../lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const result = await registerUser(username, password);
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
