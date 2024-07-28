import { NextResponse } from "next/server";
import { verifyToken, getCurrentUser } from "../../../../lib/auth";

export async function GET(req) {
  const { authorization } = req.headers;
  if (!authorization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await getCurrentUser(decoded.id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
