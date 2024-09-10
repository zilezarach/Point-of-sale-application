"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(10); // Example delivery fee
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);

    // Calculate total amount
    const totalAmount = cart.reduce(
      (sum: number, product: Product) => sum + product.price * product.quantity,
      0,
    );
    setTotal(totalAmount + deliveryFee); // Include delivery fee
  }, []);

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const order = {
      items: cart,
      totalAmount: total,
      paymentMethod,
    };

    // Send order to server
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to order confirmation or any other page
    router.push("/order-confirmation");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 gap-6">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex items-center border p-4 rounded"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-lg">
                ${product.price} x {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: ${total}</h3>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Delivery Fee: ${deliveryFee}</h4>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Payment Method</h4>
          <label>
            <input
              type="radio"
              value="Visa"
              checked={paymentMethod === "Visa"}
              onChange={() => setPaymentMethod("Visa")}
            />
            Visa
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="Mpesa"
              checked={paymentMethod === "Mpesa"}
              onChange={() => setPaymentMethod("Mpesa")}
            />
            Mpesa
          </label>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default CartPage;
