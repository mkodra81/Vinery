import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { addDays} from "date-fns";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    zip: "",
    country: "ALB",
    paymentMethod: "Credit",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProcced = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "zip",
    ];
    const newErrors = {};
    required.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/api/orders", {
      estimatedDelivery: addDays(new Date(), 1),
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      orderDetails: {
        ...formData,
      }
    });

    console.log(response.data); // Log the response for debugging

    const newOrderId = response.data._id; // Assuming the backend returns the created order with _id

    navigate(`/order-tracking/${newOrderId}`);
    clearCart();
  };

  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  return (
    <main className="min-h-screen bg-panna text-darkbrown">
      <Navbar />

      <div className="container mx-auto px-4 py-10 space-y-10">
        <h1 className="text-3xl font-semibold">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white border border-darkbrown rounded-lg shadow">
              <div className="bg-darkbrown text-panna px-6 py-4 rounded-t-lg flex justify-between">
                <h2 className="text-xl font-semibold">
                  {step === 1 ? "Shipping Information" : "Payment Method"}
                </h2>
                <span className="text-sm">Step {step} of 2</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-darkbrown"
                          } rounded-md p-2`}
                          required
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-darkbrown"
                          } rounded-md p-2`}
                          required
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.email ? "border-red-500" : "border-darkbrown"
                        } rounded-md p-2`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.phone ? "border-red-500" : "border-darkbrown"
                        } rounded-md p-2`}
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.address ? "border-red-500" : "border-darkbrown"
                        } rounded-md p-2`}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.city ? "border-red-500" : "border-darkbrown"
                          } rounded-md p-2`}
                          required
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Zip
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.zip ? "border-red-500" : "border-darkbrown"
                          } rounded-md p-2`}
                          required
                        />
                        {errors.zip && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zip}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-darkbrown rounded-md p-2"
                        required
                      >
                        <option value="ALB">Albania</option>
                        <option value="USA">United States</option>
                        <option value="ITA">Italy</option>
                        <option value="GER">Germany</option>
                        <option value="GBR">United Kingdom</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleProcced}
                        className="bg-darkbrown text-panna px-6 py-2 rounded-md hover:opacity-90 transition"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-md font-semibold mb-2">
                        Select Payment Method
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Credit"
                            checked={formData.paymentMethod === "Credit"}
                            onChange={handleChange}
                            className="accent-darkbrown"
                          />
                          Credit
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Paypal"
                            checked={formData.paymentMethod === "Paypal"}
                            onChange={handleChange}
                            className="accent-darkbrown"
                          />
                          PayPal
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-darkbrown underline"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-darkbrown text-panna px-6 py-2 rounded-md hover:opacity-90 transition"
                      >
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white border border-darkbrown rounded-lg shadow">
            <div className="bg-darkbrown text-panna px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            <div className="px-6 py-4 space-y-4 text-sm">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>
                    {item.WineName} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Checkout;
