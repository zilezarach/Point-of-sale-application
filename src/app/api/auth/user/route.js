import { NextResponse } from "next/server";
import { getUsers } from "../../../lib/db"; // Make sure to implement getUsers in your lib

export async function GET() {
  try {
    const employees = await getUsers(); // Fetch users from your database
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 },
    );
  }
}
