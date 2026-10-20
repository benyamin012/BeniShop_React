// main.jsx - فایل اصلی
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app.jsx";
import CartDeatils from "./ProductDetail.jsx";
import Header from "./Header.jsx";
import FooterPart from "./footer.jsx";
import NotFound from "./NotFoundPage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/signup.jsx";
import CheckOut from "./CheckOut/CheckoutPage.jsx";
import useAppStore from "./store/useZustand.js";

const queryClient = new QueryClient();

function SessionInitializer() {
  const restoreSession = useAppStore((state) => state.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return null;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionInitializer />
      <Header />
      <QueryClientProvider client={queryClient}>
        <div className="pt-20 max-lg:pt-13  max-sm:pt-15">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<CartDeatils />} />
            <Route path="/checkOut" element={<CheckOut />} />
            <Route path="/" exact element={<App />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </div>
      </QueryClientProvider>
      <FooterPart />
    </BrowserRouter>
  </React.StrictMode>,
);
