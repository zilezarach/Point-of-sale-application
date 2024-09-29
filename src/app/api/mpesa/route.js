
import { STKPush } from '../../../utils/mpesa';
export async function POST(req, res) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = await req.json(); // For parsing the request body
    
    // Call the STKPush function and pass the necessary parameters
    const response = await STKPush(amount, phoneNumber, accountReference, transactionDesc);
    
    // Send back the response from the STKPush call
    return new Response(JSON.stringify({ success: true, data: response }), { status: 200 });
  } catch (error) {
    console.error('STK Push Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'STK Push failed', error: error.message }), { status: 500 });
  }
}
