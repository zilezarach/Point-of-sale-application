import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";
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
export async function GET(request, { params }) {
  const client = await clientPromise;
  const db = client.db("pos"); // Assuming 'pos' is your database name
  const { id } = params;

  try {
    const query = { $or: [{ productId: id }, { name: new RegExp(id, "i") }] };
    const product = await db.collection("products").findOne(query);

    if (product) {
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
