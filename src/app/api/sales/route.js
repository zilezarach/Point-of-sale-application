import { NextResponse } from "next/server";
import { getSales, createSale } from "../../../lib/sales";

export async function GET() {
  const sales = await getSales();
  return NextResponse.json(sales);
}

export async function POST(req) {
  const newSale = await req.json();
  const sale = await createSale(newSale);
  return NextResponse.json(sale, { status: 201 });
}
