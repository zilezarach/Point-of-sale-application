const IntraSend = require('intasend-node');

const sender = new IntraSend({
  publ_key: process.env.IntraSend_PUBL_KEY,
  priv_key: process.env.IntraSend_PRIV_KEY,
  test: true,
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, phone_number, payment_method } = req.body;
    try {
      if (payment_method === 'mpesa') {
        const response = await sender.checkout.charge({
          phone_number,
          amount,
          currency,
          payment_method: 'MPESA',
        })
        return res.status(200).json({ success: true, data: response });
      }
      if (payment_method === 'card') {
        const response = await sender.checkout.charge({
          email,
          amount,
          currency,
          payment_method: 'CARD'
        })
        return res.status(200).json({ success: true, data: response });
      }
    } catch (error) {
      return res.status(500).json({ success: false, data: response })
    }
  }
}


