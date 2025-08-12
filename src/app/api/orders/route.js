import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const orders = await db.collection("orders").find().toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const body = await request.json();

    const result = await db.collection("orders").insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
