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
    const formData = await req.formData();
    const name = formData.get("name");
    const image = formData.get("image"); // This is a File object
    const stock = Number(formData.get("stock"));
    const price = formData.get("price");
    const description = formData.get("description");
    // Validate the data (e.g., ensure all fields are filled)
    if (!name || !image || !stock || !price || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save the image as a base64 string (or you could save it to cloud storage and store the URL)
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Insert the product into the database
    const client = await clientPromise;
    const db = client.db("pos"); // Replace with your DB name
    const collection = db.collection("products");

    await collection.insertOne({
      name,
      image: imageBase64, // Store the base64 image string or image URL if uploaded elsewhere
      stock,
      price,
      description,
    });

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
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
