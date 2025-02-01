import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/db";
import bcrypt from "bcrypt";

// GET: Retrieve all employees (excluding the password field)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    // Exclude the password field for security reasons
    const employees = await db
      .collection("employees")
      .find({}, { projection: { password: 0 } })
      .toArray();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.error();
  }
}

// POST: Add a new employee
export async function POST(request) {
  try {
    const { name, email, username, password, role } = await request.json();

    // Basic input validation
    if (!name || !email || !username || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection("employees").insertOne({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.error();
  }
}

// DELETE: Remove an employee by id
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("employees")
      .deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.error();
  }
}
