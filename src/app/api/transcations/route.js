import { NextResponse } from "next/server";
import { getTransactions, createTransaction } from "../../../lib/transactions";

export async function GET() {
  const transactions = await getTransactions();
  return NextResponse.json(transactions);
}

export async function POST(req) {
  const newTransaction = await req.json();
  const transaction = await createTransaction(newTransaction);
  return NextResponse.json(transaction, { status: 201 });
}
