import { NextResponse } from 'next/server';
import { STKPush } from '../../../utils/mpesa';  // Adjust path based on where the mpesa utility is located

export async function POST(request) {
  try {
    const { amount, phoneNumber, accountReference, transactionDesc } = await request.json();

    // Call the STKPush function
    const response = await STKPush(amount, phoneNumber, accountReference, transactionDesc);

    // Return success response
    return NextResponse.json(response);
  } catch (error) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
