import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const productsWithPrices = res.data.data.map(product => ({
          ...product,
          price: Math.floor(Math.random() * (250 - 25 + 1)) + 25
        }));
        setProducts(productsWithPrices);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};