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

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 },
      );
    }

    const { qty } = await req.json();

    if (!qty || qty <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("pos");
    const productsCollection = db.collection("products");

    // Find the product by ID
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    console.log(`Current stock: ${product.stock}`);

    // Calculate new stock value
    const newStock = product.stock - qty;

    // Ensure stock doesn't go negative
    if (newStock < 0) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 },
      );
    }

    // Update the stock in the database
    await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { stock: newStock } },
    );

    // Log the new stock value
    console.log(`Updated stock: ${newStock}`);

    return NextResponse.json({ message: "Stock updated", newStock });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating stock", error },
      { status: 500 },
    );
  }
}
