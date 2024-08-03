import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("pos");
  const { name, email, username, password, role } = await request.json();

  const existingUser = await db.collection("employees").findOne({ username });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    username,
    password: hashedPassword,
    role,
  };

  await db.collection("employees").insertOne(newUser);

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 },
  );
}
