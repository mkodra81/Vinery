import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking"; // Import the new component
  // import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    // <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-tracking/:orderId" element={<OrderTracking />} /> {/* Add the route for OrderTracking */}
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    // </AuthProvider>
  );
};

export default App;
