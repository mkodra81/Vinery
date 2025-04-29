import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react"; // Import useState

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, cartTotal } = useCart();
  const [orderId, setOrderId] = useState(""); // State for tracking order ID input

  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleTrackOrder = () => {
    console.log("Tracking Order ID:", orderId); // Log the order ID for debugging
    if (orderId.trim()) {
      navigate(`/order-tracking/${orderId.trim()}`);
    } else {
      // Optionally, show an error message if the ID is empty
      alert("Please enter an Order ID.");
    }
  };


  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-panna text-darkbrown">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="mb-6 text-gray-600">
            Looks like you haven't added any products yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/products"
              className="bg-darkbrown text-panna px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
            <span className="text-gray-600">or</span>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
                className="px-4 py-2 border border-darkbrown rounded-md text-darkbrown placeholder-gray-500"
              />
              <button
                onClick={handleTrackOrder}
                className="bg-transparent border border-darkbrown text-darkbrown px-6 py-2 rounded-md hover:bg-darkbrown hover:text-panna transition"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-panna text-darkbrown">
      <Navbar />
      <div className="container mx-auto px-4 py-10 space-y-10">
        <h1 className="text-3xl font-semibold">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white border border-darkbrown rounded-lg shadow">
              <div className="bg-darkbrown text-panna px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">
                  Cart Items ({cart.length})
                </h2>
              </div>
              <div>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row items-center justify-between border-t border-darkbrown px-6 py-4 gap-4"
                  >
                    <img
                      src={
                        item.image
                          ? item.image
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded border"
                    />

                    <div className="flex-1 md:px-4 text-center md:text-left">
                      <h3 className="font-semibold">{item.WineName}</h3>
                      <p className="text-sm text-gray-600">{item.ype}</p>
                    </div>

                    <div className="text-center">
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border border-darkbrown rounded-md"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 border border-darkbrown rounded-md"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="font-bold text-right w-24">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-darkbrown rounded-md hover:bg-darkbrown hover:text-panna transition"
              >
                <span className="mr-2">←</span> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white border border-darkbrown rounded-lg shadow">
            <div className="bg-darkbrown text-panna px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? "Free" : "$5.99"}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-darkbrown text-panna py-2 rounded-md hover:opacity-90 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
