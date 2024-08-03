import { NextResponse } from "next/server";

import clientPromise from "../../../lib/db";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const transactions = await db.collection("transactions").find().toArray();
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const body = await request.json();
    const result = await db.collection("transactions").insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 },
    );
  }
}
