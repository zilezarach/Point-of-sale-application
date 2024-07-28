import { NextResponse } from "next/server";
import { getProducts, createProduct } from "../../../../lib/product";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  const product = await req.json();
  try {
    const result = await createProduct(product);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
