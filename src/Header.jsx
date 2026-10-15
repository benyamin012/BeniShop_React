import React from "react";
import { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import HeadShowWhatWeSell from "./headShowProductFildPart";
import { CartContext } from "./context";
import { Link } from "react-router-dom";
import useAppStore from "./store/useZustand";
import ShoppingCart from "./shoppingCart";
import { MdMenu } from "react-icons/md";
import HamberMenu from "./HamburgerMenuUi";
import { MdArrowDropDown } from "react-icons/md";

function Header() {
  const [products, setProducts] = useState([]);
  const [usermodal, setusermodal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openHamberMenu, setOpenHamberMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { cart, user, logout, addToCart, increaseQuantity, decreaseQuantity } =
    useAppStore();

  useEffect(() => {
    console.log("test in");

    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser);
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {}
    }

    getProducts();
  }, []);

  function setFn(id) {
    setOpenMenu((prevId) => (prevId === id ? null : id));
  }

  const categories = [...new Set(products.map((p) => p.category))];

  const total = cart.reduce((firstNum, nextNum) => {
    return firstNum + nextNum.price * nextNum.quantity;
  }, 0);

  return (
    <div className="w-full fixed z-9999  bg-white ">
      <div className="flex container mx-auto py-2.5 px-9 max-lg:px-0 items-center text-center max-sm:px-5 justify-between w-full">
        <Link to={"/"}>
          <div className="flex flex-row gap-1.5 items-center">
            <h2 className="font-bold text-[24px] text-[#0559F9] max-lg:text-[18px]">
              Beni Shop
            </h2>
            <AiOutlineShopping
              className="max-lg:text-3xl text-5xl"
              color="#0559F9"
            />
          </div>
        </Link>

        <div className="flex items-center gap-8 max-md:hidden">
          {categories.map((category, i) => (
            <CartContext.Provider
              key={i}
              value={{
                item: category,
                id: category,
                setvalue: setFn,
                openMenu,
                products: products,
              }}
            >
              <HeadShowWhatWeSell />
            </CartContext.Provider>
          ))}
        </div>

        <MdMenu
          className="hidden max-md:block text-[30px] items-end text-end "
          onClick={() => setOpenHamberMenu(!openHamberMenu)}
        />

        <div
          className="flex gap-1.5 items-center cursor-pointer relative"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {user ? (
            <span
              className=" group
    mr-15
    relative
    inline-flex
    items-center
    gap-1
    text-[18px]
    font-medium
    text-[#2563EB]
    transition-all
    duration-300
    capitalize
    text-center
    justify-center
    hover:text-[#114EF7]"
              onClick={() => {
                setusermodal(!usermodal);
                console.log(usermodal);
              }}
            >
              {user.userName}
              <MdArrowDropDown />
            </span>
          ) : (
            <Link
              to={"/Login"}
              className="
    group
    mr-15
    relative
    inline-flex
    items-center
    gap-1
    text-[14px]
    font-medium
    text-[#2563EB]
    transition-all
    duration-300
    hover:text-[#114EF7]
  "
            >
              Login /<span className="font-bold">Sign up</span>
              <span
                className="
      absolute
      -bottom-1
      right-0
      h-0.5
      w-0
      rounded-full
      bg-[#2563EB]
      transition-all
      duration-300
      group-hover:w-full
    "
              />
            </Link>
          )}
          {/* /////////////////////////////////////////////////// */}
          {usermodal && (
            <div className="w-35 h-auto   line-clamp-1  z-9999 duration-200 delay-150 rounded-b-md absolute items-center text-center   shadow-[0_35px_35px_rgba(0,0,0,0.25)]  border-t-2 border-blue-600 top-10 bg-[#ffffff] flex flex-col gap-2.5   ">
              <ul className="w-full">
                <li className="hover:text-[#4343ff] font-normal text-[18px]  hover:bg-[#9fd9ff] duration-150 delay-100  w-full    p-2.5 ">
                  داشبورد
                </li>
                <Link
                  onClick={() => {
                    setusermodal(!usermodal);
                  }}
                  to={"/"}
                >
                  <li className="hover:text-[#4343ff] font-normal text-[18px]  hover:bg-[#9fd9ff] duration-150 delay-100  w-full     p-2.5 ">
                    سبد خرید
                  </li>
                </Link>
                <Link
                  to={"/Login"}
                  onClick={() => {
                    (setusermodal(!usermodal), logout());
                  }}
                >
                  <li className="hover:text-[#4343ff] font-normal text-[18px]  hover:bg-[#9fd9ff] duration-150 delay-100  w-full    p-2.5 ">
                    خروج
                  </li>
                </Link>
              </ul>
            </div>
          )}

          {/* /////////////////////////////////////////////////// */}
          <span className="text-white text-[12px] absolute -top-2 -right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
          <h5 className="font-bold text-[18px] text-[#0559F9]">Cart</h5>
          <IoCartOutline size={20} />
        </div>
      </div>
      {/* {openHamberMenu && <HamberMenu categories={categories} cart={cart} />} */}
      <HamberMenu
        className={!openHamberMenu ? "-translate-x-full" : "translate-x-0"}
        categories={categories}
      />
      <div
        className={
          cart.length === 0
            ? "hidden opacity-0 "
            : "   fixed  duration-200 delay-200  right-20 top-15 z-50 flex flex-col container mx-auto rounded-[20px]  w-170 max-md:w-135  bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        }
      >
        {openMenu && (
          <div className="flex justify-between  px-10 max-md:px-15 py-2.5">
            <span className="font-medium text-[18px}">
              Shopping Cart ({cart.length})
            </span>
            <span className="text-[#1755F8] font-semibold text-[14px]">
              View Cart
            </span>
          </div>
        )}

        {openMenu &&
          cart.map((item) => {
            return <ShoppingCart item={item} />;
          })}

        {openMenu && (
          <>
            <div className="gap-10 items-center text-center  flex justify-between px-15 py-5    border-t  border-[#EFF1F6] mx-auto   w-full rounded-[10px] ">
              <span className="font-medium text-[18px}">Total:</span>
              <span className="text-[#2C65E5] text-[16px] font-bold">
                {total}
              </span>
            </div>
            <div className="flex justify-between gap-5 px-10 py-2.5">
              <button className="border text-[#1850e3] border-gray w-full max-md:p-1.5  rounded-[20px] py-2.5">
                View Cart
              </button>
              <button
                className="font-medium cursor-pointer w-full  py-2.5 max-md:p-1.5  bg-[#1850E3] rounded-[20px] text-white text-[20px] "
                onClick={() => {
                  if (user) {
                    window.location.href = "/checkOut";
                  } else {
                    window.location.href = "/login";
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
