import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const employees = await db.collection("employees").find().toArray();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");

    // Extract all required fields from the request body.
    const { name, email, role, password, username } = await request.json();

    // Validate that all required fields are provided.
    if (!name || !email || !role || !password || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new employee object including the username.
    const newEmployee = {
      name,
      email,
      role,
      username,
      password: hashedPassword,
    };

    // Insert the new employee into the database.
    const result = await db.collection("employees").insertOne(newEmployee);

    return NextResponse.json({
      message: "Employee added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.error();
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const client = await clientPromise;
    const db = client.db("pos");
    await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.error();
  }
}
