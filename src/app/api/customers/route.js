import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const customersCollection = db.collection("customers");

    const { name, phoneNumber } = await request.json();

    const newCustomer = {
      name,
      phoneNumber,
      createdAt: new Date(),
    };

    await customersCollection.insertOne(newCustomer);

    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error("Error registering customer:", error);
    return NextResponse.json(
      { message: "Error registering customer" },
      { status: 500 },
    );
  }
}
