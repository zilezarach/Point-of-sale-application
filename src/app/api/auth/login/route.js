import { NextResponse } from "next/server";
import { authenticateUser } from "../../../../lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const result = await authenticateUser(username, password);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
