import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("pos");
  const { username, password } = await request.json();

  const employee = await db.collection("employees").findOne({ username });
  if (!employee) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 402 },
    );
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 403 },
    );
  }

  const token = jwt.sign(
    {
      employeeId: employee._id,
      username: employee.username,
      role: employee.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const response = NextResponse.json(
    { token, role: employee.role },
    { status: 200 },
  );

  // Set the cookie using the response's cookies API:
  response.cookies.set("token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return response;
}
