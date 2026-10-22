import React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import Product from "./products.jsx";
import FooterPart from "./footer.jsx";
import BanerOfBody from "./banerOfBody.jsx";
import { FaAngleRight } from "react-icons/fa6";
import HeadShowWhatWeSell from "./headShowProductFildPart.jsx";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import ShoppingCart from "./shoppingCart.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingFunction from "./loading.jsx";
import { CartContext } from "./context.jsx";
import CartDetails from "./ProductDetail.jsx";
import { Link, NavLink } from "react-router-dom";
import useAppStore from "./store/useZustand";
import { useQuery, useMutation } from "@tanstack/react-query";
import OrderSummery from "./CheckOut/OrderSummery.jsx";
function App(props) {
  // const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openMenu, setOpenMenu] = useState(null);
  const [openCart, setOpenCart] = useState(false);

  // const [shoppinProduct, setShoppingProduct] = useState([]);
  // const [cart, setCart] = useState([]);

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useAppStore();

  // ....................................................................................

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
  });

  // .....................................................................................

  // useEffect(() => {
  //   async function getApi() {
  //     try {
  //       const response = await fetch("https://fakestoreapi.com/products", {
  //         method: "GET",
  //       });

  //       const data = await response.json();
  //       console.log(data);

  //       if (response.ok) {
  //         setState(data);
  //       }
  //     } catch (error) {
  //       console.error("❌ ERROR:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getApi();
  // }, []);

  const categories = [...new Set(data?.map((item) => item.category))];

  const forDeletProduct = (productId) => {
    let newArray = cart.filter((p) => p.id !== productId);

    addToCart(newArray);
  };

  function forAddProductToShoppingCart(id) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      addToCart(updatedCart);
    } else {
      let shoppingCartItem = data?.find((i) => i.id === id);
      addToCart((oldProducts) => [
        ...oldProducts,
        {
          ...shoppingCartItem,
          quantity: 1,
        },
      ]);
    }
  }

  const total = cart.reduce((firstNum, nextNum) => {
    return firstNum + nextNum.price * nextNum.quantity;
  }, 0);

  // useEffect(() => {
  //   localStorage.setItem("shoppingCart", JSON.stringify(cart));
  // }, [cart]);

  // const plusFunc = (e) => {
  //   const updateCartPlus = cart.map((p) =>
  //     p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
  //   );
  //   setCart(updateCartPlus);
  // };
  // const minusFunc = (item) => {
  //   let hasInCart = cart.find((p) => p.id === item.id);
  //   if (hasInCart) {
  //     if (hasInCart.quantity === 1) {
  //       forDeletProduct(item.id);
  //     } else {
  //       const updateCart = cart.map((p) =>
  //         p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p,
  //       );
  //       addToCart(updateCart);
  //     }
  //   }
  // };
  return (
    <>
      <SmoothScroll>
        <BanerOfBody />
        <div className=" flex flex-col justify-center mx-auto gap-5 py-2.5 w-full container ">
          <div className="flex justify-between px-9  max-lg:px-0 max-sm:px-2.5">
            <h3 className="font-bold text-[24px] max-lg:text-[20px] max-sm:text-[18px]">
              Featured Products
            </h3>
          </div>
          {isLoading ? (
            <LoadingFunction />
          ) : (
            <div className=" grid grid-cols-5 px-9 max-sm:px-2.5 gap-5 max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-lg:px-0  justify-center mt-5">
              {data?.map((item) => (
                <CartContext.Provider
                  key={item.id}
                  value={{
                    item,

                    toAdd: forAddProductToShoppingCart,
                  }}
                >
                  <Product />
                </CartContext.Provider>
              ))}
            </div>
          )}
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;
{
}
