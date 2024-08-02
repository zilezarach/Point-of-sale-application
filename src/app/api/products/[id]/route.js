import { NextResponse } from "next/server";
import clientPromise from "../../../../../lib/db";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.error();
  }
}
