import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const orders = await db.collection("orders").find().toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const { productId, quantity, totalPrice } = await request.json();
    const client = await clientPromise;
    const db = client.db("pos");
    const result = await db
      .collection("orders")
      .insertOne({ productId, quantity, totalPrice, date: new Date() });
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
    await db.collection("orders").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    return NextResponse.error();
  }
}
