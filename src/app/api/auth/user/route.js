import { NextResponse } from "next/server"; // Make sure to implement getUsers in your lib
import clientPromise from "../../../../lib/db";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("pos");
    const users = await db
      .collection("employees")
      .find({})
      .sort({ loginTime: -1 })
      .toArray();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
