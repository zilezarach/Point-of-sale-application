import { NextResponse } from "next/server";
import { getOrders, createOrder } from "../../../lib/orders";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(req) {
  const newOrder = await req.json();
  const order = await createOrder(newOrder);
  return NextResponse.json(order, { status: 201 });
}
