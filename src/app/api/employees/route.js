import { NextResponse } from "next/server";
import { clientPromise } from "../../../lib/db";

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
  try {
    const { name, position, salary } = await request.json();
    const client = await clientPromise;
    const db = client.db("pos");
    const result = await db
      .collection("employees")
      .insertOne({ name, position, salary });
    return NextResponse.json(result.insertedId);
  } catch (error) {
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
    return NextResponse.error();
  }
}
