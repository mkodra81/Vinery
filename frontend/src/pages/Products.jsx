import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img from "../assets/SkyBolt.png"; // Use your product image

const products = [
  {
    id: 1,
    name: "Chianti Classico",
    price: 18,
    description: "Classic red wine from Tuscany.",
    type: "Red",
    region: "Italy",
    year: 2020,
    alcohol: 13.5,
  },
  {
    id: 2,
    name: "Sauvignon Blanc",
    price: 22,
    description: "Crisp white wine from New Zealand.",
    type: "White",
    region: "New Zealand",
    year: 2022,
    alcohol: 12.5,
  },
  {
    id: 3,
    name: "Prosecco",
    price: 25,
    description: "Sparkling wine with fruity aromas.",
    type: "Sparkling",
    region: "Italy",
    year: 2021,
    alcohol: 11.0,
  },
  {
    id: 4,
    name: "Rosé de Provence",
    price: 19,
    description: "Elegant rosé with floral notes.",
    type: "Rosé",
    region: "France",
    year: 2022,
    alcohol: 12.0,
  },
  {
    id: 5,
    name: "Rioja Reserva",
    price: 30,
    description: "Mature red wine from Spain.",
    type: "Red",
    region: "Spain",
    year: 2018,
    alcohol: 14.0,
  },
  {
    id: 6,
    name: "Chardonnay",
    price: 21,
    description: "Balanced white wine from France.",
    type: "White",
    region: "France",
    year: 2021,
    alcohol: 13.0,
  },
];

const ProductGrid = () => {
  const [filters, setFilters] = useState({
    type: "",
    region: "",
    sort: "",
    yearMin: 2018,
    yearMax: 2025,
    alcoholMin: 10,
    alcoholMax: 15,
  });

  const filteredProducts = products
    .filter((p) => (filters.type ? p.type === filters.type : true))
    .filter((p) => (filters.region ? p.region === filters.region : true))
    .filter((p) => p.year >= filters.yearMin && p.year <= filters.yearMax)
    .filter(
      (p) => p.alcohol >= filters.alcoholMin && p.alcohol <= filters.alcoholMax
    )
    .sort((a, b) => {
      if (filters.sort === "Price: Low to High") return a.price - b.price;
      if (filters.sort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  return (
    <section className="flex flex-col md:flex-row w-full px-4 md:px-6 py-10 gap-8">
      {/* Filters */}
      <aside className="w-full md:w-1/4 text-darkbrown sticky md:top-0">
        <h3 className="text-lg font-semibold mb-4">Sort by</h3>
        <select
          className="mb-6 w-full p-2 bg-panna border rounded-md"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="">Sort by</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>

        {/* Type */}
        <h3 className="text-lg font-semibold mb-4">Type</h3>
        <div className="space-y-2 mb-6">
          {["Red", "White", "Rosé", "Sparkling"].map((type) => (
            <label key={type} className="block text-sm">
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Region */}
        <h3 className="text-lg font-semibold mb-4">Region</h3>
        <select
          className="w-full p-2 bg-panna border rounded-md mb-6"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, region: e.target.value }))
          }
        >
          <option value="">All Regions</option>
          <option value="Italy">Italy</option>
          <option value="France">France</option>
          <option value="Spain">Spain</option>
          <option value="New Zealand">New Zealand</option>
        </select>

        {/* Year Filter */}
        <h3 className="text-lg font-semibold mb-4">Year Range</h3>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="number"
            placeholder="Min"
            value={filters.yearMin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                yearMin: Number(e.target.value),
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.yearMax}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                yearMax: Number(e.target.value),
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
        </div>

        {/* Alcohol Filter */}
        <h3 className="text-lg font-semibold mb-4">Alcohol %</h3>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="number"
            step="0.1"
            placeholder="Min"
            value={filters.alcoholMin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                alcoholMin: Number(e.target.value),
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Max"
            value={filters.alcoholMax}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                alcoholMax: Number(e.target.value),
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
        </div>

        {/* Reset */}
        <button
          className="mt-6 text-sm underline"
          onClick={() =>
            setFilters({
              type: "",
              region: "",
              sort: "",
              yearMin: 2018,
              yearMax: 2025,
              alcoholMin: 10,
              alcoholMax: 15,
            })
          }
        >
          Reset Filters
        </button>
      </aside>

      {/* Products */}
      <div className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-none relative p-4 rounded-lg border border-darkbrown shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out flex flex-col items-center group"
          >
            <img
              src={img}
              alt={product.name}
              className="w-full h-auto object-contain mb-4 rounded-md"
            />
            <div className="absolute bottom-0 w-full bg-[#FFFFF7] opacity-90 text-white px-2 py-6 rounded-b-full text-xs font-semibold flex flex-col justify-center items-center transition-all duration-500 ease-in-out group-hover:py-10">
              <h4 className="text-lg font-semibold text-darkbrown">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600">${product.price}</p>
              <p className="text-xs text-gray-700 hidden group-hover:block transition-opacity duration-500 ease-in-out mt-2">
                {product.description}
              </p>
              <button className="mt-4 px-4 py-2 bg-darkbrown text-panna rounded-md hidden group-hover:block transition-opacity duration-500 ease-in-out">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <main className="w-full min-h-screen bg-panna">
      <Navbar />
      <ProductGrid />
      <Footer />
    </main>
  );
};

export default Products;
