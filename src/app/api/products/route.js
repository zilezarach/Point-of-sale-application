import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const products = await db.collection("products").find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const body = await request.json();
    const result = await db.collection("products").insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
