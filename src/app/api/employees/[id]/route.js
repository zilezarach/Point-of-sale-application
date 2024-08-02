import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const employees = await db.collection("employees").find().toArray();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("employees")
      .insertOne({ name, email, role });
    return NextResponse.json(result.insertedId);
  } catch (error) {
    return NextResponse.error();
  }
}

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
    return NextResponse.error();
  }
}
