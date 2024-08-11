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
export async function GET(req, res) {
  const { id } = req.query;

  try {
    const db = await clientPromise();
    const product = await db.collection("products").findOne({ id });

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product details" });
  }
}
