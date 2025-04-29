import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const { products, loading } = useProducts();
  const [filters, setFilters] = useState({
    type: "",
    country: "",
    sort: "",
    yearMin: 2000,
    yearMax: new Date().getFullYear(),
    abvMin: 8,
    abvMax: 18,
    search: "", // Add search state
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { addToCart } = useCart();

  if (loading)
    return <div className="w-full text-center py-10">Loading...</div>;

  // Define filteredProducts before using it
  const filteredProducts = products
    .filter(
      (
        p // Add search filter first
      ) =>
        filters.search
          ? p.WineName.toLowerCase().includes(filters.search.toLowerCase())
          : true
    )
    .filter((p) => (filters.type ? p.Type === filters.type : true))
    .filter((p) => (filters.country ? p.Country === filters.country : true))
    .filter((p) => {
      let vintagesArray;
      try {
        vintagesArray = JSON.parse(p.Vintages);
      } catch {
        return false;
      }
      if (!Array.isArray(vintagesArray) || vintagesArray.length === 0)
        return false;
      return vintagesArray.some(
        (vintage) => vintage >= filters.yearMin && vintage <= filters.yearMax
      );
    })
    .filter((p) => p.ABV >= filters.abvMin && p.ABV <= filters.abvMax)
    .sort((a, b) => {
      if (filters.sort === "Price: Low to High") return a.price - b.price;
      if (filters.sort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  };

  const imageBaseUrl = "http://localhost:5000/";

  return (
    <section className="flex flex-col md:flex-row w-full px-4 md:px-6 py-10 gap-8">
      <aside className="w-full md:w-1/4 text-darkbrown md:top-0 h-fit">
        <h3 className="text-lg font-semibold mb-4">Search by Name</h3>
        <input
          type="text"
          placeholder="Search wines..."
          className="mb-6 w-full p-2 bg-panna border rounded-md"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
        <h3 className="text-lg font-semibold mb-4">Sort by</h3>
        <select
          className="mb-6 w-full p-2 bg-panna border rounded-md"  
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="">Sort by</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>

        <h3 className="text-lg font-semibold mb-4">Type</h3>
        <div className="space-y-2 mb-6">
          {["Red", "White", "Rosé", "Sparkling", "Dessert"].map((type) => (
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
          <label className="block text-sm">
            <input
              type="radio"
              name="type"
              value=""
              checked={filters.type === ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
              className="mr-2"
            />
            All Types
          </label>
        </div>

        <h3 className="text-lg font-semibold mb-4">Country</h3>
        <select
          className="w-full p-2 bg-panna border rounded-md mb-6"
          value={filters.country}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, country: e.target.value }))
          }
        >
          <option value="">All Countries</option>
          <option value="Italy">Italy</option>
          <option value="France">France</option>
          <option value="Spain">Spain</option>
          <option value="New Zealand">New Zealand</option>
          <option value="South Africa">South Africa</option>
        </select>

        <h3 className="text-lg font-semibold mb-4">Year Range</h3>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="number"
            placeholder="Min"
            value={filters.yearMin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                yearMin: Number(e.target.value) || filters.yearMin,
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
                yearMax: Number(e.target.value) || filters.yearMax,
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
        </div>

        <h3 className="text-lg font-semibold mb-4">ABV %</h3>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="number"
            step="0.1"
            placeholder="Min"
            value={filters.abvMin}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                abvMin: Number(e.target.value) || filters.abvMin,
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="number"
            step="0.1"
            placeholder="Max"
            value={filters.abvMax}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                abvMax: Number(e.target.value) || filters.abvMax,
              }))
            }
            className="w-1/2 p-2 border rounded-md"
          />
        </div>

        <button
          className="mt-6 text-sm underline"
          onClick={() =>
            setFilters({
              type: "",
              country: "",
              sort: "",
              yearMin: 2000,
              yearMax: new Date().getFullYear(),
              abvMin: 8,
              abvMax: 18,
              search: "", // Reset search state
            })
          }
        >
          Reset Filters
        </button>
      </aside>
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="bg-none relative p-4 rounded-lg border border-darkbrown shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out flex flex-col items-center group cursor-default"
              >
                <img
                  src={
                    product.image
                      ? `${imageBaseUrl}${product.image.replace(/\\\\/g, "/")}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s"
                  }
                  alt={product.WineName}
                  className="w-full h-48 object-contain mb-4 rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#FFFFF7] opacity-90 px-2 py-4 rounded-b-lg text-xs font-semibold flex flex-col justify-center items-center transition-all duration-500 ease-in-out group-hover:py-6 group-hover:opacity-100">
                  <h4 className="text-base font-semibold text-darkbrown text-center mb-1">
                    {product.WineName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    ${product.price ? product.price.toFixed(2) : "N/A"}
                  </p>
                  <p className="text-xs text-gray-700 text-center hidden group-hover:block transition-opacity duration-500 ease-in-out mt-1 max-h-20 overflow-y-auto">
                    {/* Display harmonize instead of description */}
                    {(() => {
                      let harmonizeArray = [];
                      try {
                        // Attempt to parse the Harmonize string into an array
                        harmonizeArray = JSON.parse(
                          product.Harmonize.replace(/'/g, '"')
                        );
                      } catch (error) {
                        console.error(
                          "Failed to parse Harmonize:",
                          product.Harmonize,
                          error
                        );
                        // Handle cases where Harmonize might be a plain string or malformed
                        if (
                          typeof product.Harmonize === "string" &&
                          !product.Harmonize.startsWith("[")
                        ) {
                          harmonizeArray = [product.Harmonize]; // Treat as single item array if just a string
                        }
                      }

                      if (
                        Array.isArray(harmonizeArray) &&
                        harmonizeArray.length > 0
                      ) {
                        return `Pairs with: ${harmonizeArray.join(", ")}`;
                      } else {
                        return "No harmonization info available.";
                      }
                    })()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link navigation
                      addToCart(product, 1);
                    }}
                    className="mt-3 px-4 py-2 bg-darkbrown text-panna rounded-md hidden group-hover:block transition-opacity duration-500 ease-in-out cursor-pointer hover:bg-opacity-80"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products match the current filters.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="w-full flex justify-center items-center mt-10 space-x-1 sm:space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)} // Use handlePageChange for consistency
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 rounded bg-panna text-darkbrown border border-darkbrown disabled:opacity-50"
            >
              Prev
            </button>
            {/* Render page numbers dynamically based on screen size and total pages */}
            {(() => {
              const pageNumbers = [];
              const maxPagesToShow = 5; // Max page numbers to show directly on mobile
              const halfMaxPages = Math.floor(maxPagesToShow / 2);

              if (totalPages <= maxPagesToShow + 2) {
                // Show all if total pages is small
                for (let i = 1; i <= totalPages; i++) {
                  pageNumbers.push(i);
                }
              } else {
                // Always show first page
                pageNumbers.push(1);

                // Ellipsis after first page?
                if (currentPage > halfMaxPages + 2) {
                  pageNumbers.push("...");
                }

                // Determine start and end range around current page
                let startPage = Math.max(2, currentPage - halfMaxPages);
                let endPage = Math.min(
                  totalPages - 1,
                  currentPage + halfMaxPages
                );

                // Adjust range if near the beginning
                if (currentPage <= halfMaxPages + 1) {
                  endPage = Math.min(totalPages - 1, maxPagesToShow);
                }
                // Adjust range if near the end
                if (currentPage >= totalPages - halfMaxPages) {
                  startPage = Math.max(2, totalPages - maxPagesToShow + 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(i);
                }

                // Ellipsis before last page?
                if (currentPage < totalPages - halfMaxPages - 1) {
                  pageNumbers.push("...");
                }

                // Always show last page
                pageNumbers.push(totalPages);
              }

              return pageNumbers.map((num, index) =>
                num === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 sm:px-2 py-1 text-darkbrown"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-2 sm:px-3 py-1 rounded border ${
                      currentPage === num
                        ? "bg-darkbrown text-panna border-darkbrown"
                        : "bg-panna text-darkbrown border-darkbrown" // Added border for consistency
                    }`}
                  >
                    {num}
                  </button>
                )
              );
            })()}
            <button
              onClick={() => handlePageChange(currentPage + 1)} // Use handlePageChange for consistency
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 rounded bg-panna text-darkbrown border border-darkbrown disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
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
