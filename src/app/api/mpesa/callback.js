import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();
  console.log('Received callback data:', data);

  // Handle the callback data here
  // You can save the transaction details in your database or perform any other necessary actions

  return NextResponse.json({ message: 'Callback received successfully' });
}
