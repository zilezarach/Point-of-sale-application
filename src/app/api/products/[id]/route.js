import { NextResponse } from "next/server";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../../../lib/product";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const product = await getProductById(id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const update = await req.json();
  try {
    const result = await updateProduct(id, update);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const result = await deleteProduct(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
