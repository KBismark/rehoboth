import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import OrderConfirmation from "@/pages/OrderConfirmation";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Categories from "@/pages/Categories";
import NotFound from "@/pages/NotFound";
import { Toaster } from "react-hot-toast";
import Checkout1 from "./pages/Checkout1";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout1 />} />
            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#FACC22",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
