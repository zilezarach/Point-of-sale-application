import React from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReceiptProps {
  transactionId: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentMethod: string;
  deliveryFee?: number;
  storeName: string;
  customerName: string;
}

const Receipt: React.FC<ReceiptProps> = ({ transactionId, items, totalAmount, paymentMethod, deliveryFee = 0, storeName, customerName }) => {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const receiptElement = document.getElementById('receipt')!;

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG');
    pdf.save(`receipt_${transactionId}.pdf`);
  };

  return (
    <div id="receipt" className="receipt-container p-4 bg-white rounded shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-center text-xl font-bold mb-4">{storeName} Receipt</h2>

      <div className="text-left mb-4">
        <p><strong>Customer:</strong> {customerName}</p>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
      </div>

      <table className="w-full text-left mb-4">
        <thead>
          <tr className="border-b">
            <th>Item</th>
            <th>Qty</th>
            <th>Price (KES)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mb-2">
        <p><strong>Delivery Fee:</strong></p>
        <p>{deliveryFee.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p><strong>Total:</strong></p>
        <p>{totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</p>
      </div>
      <div className="flex justify-between mb-2">
        <p><strong>Payment Method:</strong></p>
        <p>{paymentMethod}</p>
      </div>

      <div className="text-center">
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">
          Print Receipt
        </button>
        <button onClick={handleDownloadPDF} className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 ml-4">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Receipt;
