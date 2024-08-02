import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { name, category, price, stock, description, imageUrl } =
      await request.json();

    const newProduct = {
      name,
      price,
      stock,
      description,
    };

    const result = await db.collection("products").insertOne(newProduct);

    if (result.insertedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.error();
  }
}
