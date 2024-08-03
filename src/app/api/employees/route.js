import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const employees = await db.collection("employees").find().toArray();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("pos");
  const { name, email, role, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newEmployee = {
    name,
    email,
    role,
    password: hashedPassword, // Ensure password is hashed
  };

  await db.collection("employees").insertOne(newEmployee);

  return NextResponse.json({ message: "Employee added successfully" });
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const client = await clientPromise;
    const db = client.db("pos");
    await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Employee deleted" });
  } catch (error) {
    return NextResponse.error();
  }
}
