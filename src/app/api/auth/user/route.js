import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pos");

    const currentUsers = await db
      .collection("users")
      .find({ current: true })
      .toArray();
    const previousUsers = await db
      .collection("users")
      .find({ current: false })
      .toArray();

    return NextResponse.json({
      current: currentUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
      })),
      previous: previousUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
      })),
    });
  } catch (error) {
    return NextResponse.error();
  }
}
