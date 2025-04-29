import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetailSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [vintage, setVintage] = useState("Unspecified");

  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = products.find((product) => product._id === id);
    if (product) {
      addToCart({ ...product, vintage }, quantity);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-darkbrown">
        Loading product details...
      </div>
    );
  }

  const product = products.find((product) => product._id === id);
  const imageBaseUrl = "http://localhost:5000/";

  if (!product) {
    return (
      <div className="w-full text-center py-20 text-darkbrown">
        Product not found.
      </div>
    );
  }

  return (
    <section className="flex flex-col md:flex-row w-full px-4 md:px-6 py-10 gap-8 bg-panna text-darkbrown">
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={
            product.image
              ? `${imageBaseUrl}${product.image.replace(/\\/g, "/")}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s"
          }
          alt={product.WineName}
          className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg border border-darkbrown"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-semibold">{product.WineName}</h1>
        <h2 className="text-lg text-gray-700">
          {product.Type} - {product.Country}
        </h2>
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((prev) => prev - 1)}
              className="px-2 py-1 border border-darkbrown rounded-md"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-2 py-1 border border-darkbrown rounded-md"
            >
              +
            </button>
          </div>
          <select
            value={vintage}
            onChange={(e) => setVintage(e.target.value)}
            className="ml-2 p-2 border border-darkbrown rounded-md bg-white"
          >
            <option value="Unspecified">Unspecified</option>
            {(() => {
              let vintagesArray = [];
              try {
                vintagesArray = JSON.parse(product.Vintages);
              } catch {}
              return Array.isArray(vintagesArray)
                ? vintagesArray.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))
                : null;
            })()}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-darkbrown text-panna rounded-md hover:opacity-90 transition"
        >
          Add to Cart
        </button>

        <div className="text-sm mt-2 text-gray-600">
          Estimated delivery in <strong>1 day</strong>
        </div>
        <div className="text-sm text-gray-600">
          Sold by <strong>Vinery</strong>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Pairs well with:</h3>
          <p className="text-sm mt-1">
            {(() => {
              let harmonizeArray = [];
              try {
                harmonizeArray = JSON.parse(
                  product.Harmonize.replace(/'/g, '"')
                );
              } catch {
                if (
                  typeof product.Harmonize === "string" &&
                  !product.Harmonize.startsWith("[")
                ) {
                  harmonizeArray = [product.Harmonize];
                }
              }

              return Array.isArray(harmonizeArray) && harmonizeArray.length > 0
                ? harmonizeArray.join(", ")
                : "No harmonization info available.";
            })()}
          </p>
        </div>
      </div>
    </section>
  );
};

const ProductDetail = () => {
  return (
    <main className="w-full min-h-screen bg-panna">
      <Navbar />
      <ProductDetailSection />
      <Footer />
    </main>
  );
};

export default ProductDetail;
