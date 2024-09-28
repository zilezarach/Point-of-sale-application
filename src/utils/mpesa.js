import axios from "axios";
import { Timestamp, Transaction } from "mongodb";
import { headers } from "next/headers";

const URL = 'https://sandbox.safaricom.co.ke';

const getToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const auth = new Buffer.from(`${consumerKey}: ${consumerSecret}`).toString('base64');

  try {
    const response = await axios.get(`${URL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic QVh1WUcycXBRNjFYUDl6d0c3RU9ySXhFS1g1N3NPWEgyWkl3RlFZNHlWallqWUVmOnJ4UzVUVjN2d1VVc3NSVjZ4SktMNlZrV3hoVzVhRDI5bllBNVlyRUFMUlJZR3FqOFgyS3lXZm9tOFZwaVJOY3Y=`,
        'Accept': 'application/json',

      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error Fetching token:', error);
    throw error;
  }
};

const STKPush = async (amount, phoneNumber, accountReference, transactionDesc) => {
  const Token = await getToken();
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date().toISOString().replace(/[:.KE]/g, '').slice(0, 14);

  const password = new Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortcode,
    CallBackURL: 'https://6dc6-105-163-1-227.ngrok-free.app/callback',

    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };
  try {
    const response = await axios.post(`${URL}/mpesa/stkpush/v1/processrequest`, payload, {
      headers: {
         Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data;
  } catch (error) {
    console.error('Error initiating STK PUSH:', error);
    throw error;
  }
};

export { STKPush };
