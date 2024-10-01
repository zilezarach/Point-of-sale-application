import axios from "axios";
import { Timestamp, Transaction } from "mongodb";
import { headers } from "next/headers";

const URL = 'https://sandbox.safaricom.co.ke';

const getToken = async () => {



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

const STKPush = async (amount, phoneNumber) => {
  const Token = await getToken();
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);



  const password = new Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');


  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,  // Correctly formatted phone number
    PartyB: shortcode,
    PhoneNumber: phoneNumber,
    CallBackURL: "https://dcb2-105-163-1-227.ngrok-free.app/mpesa/callback",
    AccountReference: "Test",
    TransactionDesc: "Test",
  };

  try {
    const response = await axios.post(`${URL}/mpesa/stkpush/v1/processrequest`, payload, {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating STK PUSH:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export { STKPush }
