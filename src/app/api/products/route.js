import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const products = await db.collection("products").find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
}
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const { name, price, stock, description } = await req.json();
    const product = { name, price, stock, description };
    await db.collection("products").insertOne(product);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const { productId, quantitySold } = await req.json();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    const updatedStock = product.stock - parseInt(quantitySold);

    await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(productId) },
        { $set: { stock: updatedStock } },
      );

    return new Response(JSON.stringify({ success: true, updatedStock }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update stock" }), {
      status: 500,
    });
  }
}
