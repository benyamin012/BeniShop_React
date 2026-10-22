import React, { useEffect, useRef, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { MdMenu, MdArrowDropDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import HeadShowWhatWeSell from "./headShowProductFildPart";
import { CartContext } from "./context";
import useAppStore from "./store/useZustand";
import ShoppingCart from "./shoppingCart";
import HamberMenu from "./HamburgerMenuUi";

function Header() {
  const [products, setProducts] = useState([]);

  // Each menu has its own state.
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [openHamberMenu, setOpenHamberMenu] = useState(false);

  // Refs include both the trigger and the corresponding dropdown.
  const userRef = useRef(null);
  const cartRef = useRef(null);
  const categoryRef = useRef(null);
  const hamburgerRef = useRef(null);

  const { cart, user, logout } = useAppStore();

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products.
  useEffect(() => {
    let isMounted = true;

    async function getProducts() {
      try {
        const response = await fetch("http://localhost:4000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close every menu after route changes.
  useEffect(() => {
    setCartOpen(false);
    setUserModalOpen(false);
    setOpenCategoryId(null);
    setOpenHamberMenu(false);
  }, [location.pathname]);

  // Close menus when clicking outside their respective containers.
  useEffect(() => {
    function handleOutsideClick(event) {
      const target = event.target;

      if (userRef.current && !userRef.current.contains(target)) {
        setUserModalOpen(false);
      }

      if (cartRef.current && !cartRef.current.contains(target)) {
        setCartOpen(false);
      }

      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setOpenCategoryId(null);
      }

      if (hamburgerRef.current && !hamburgerRef.current.contains(target)) {
        setOpenHamberMenu(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // Open/close a category and close unrelated menus.
  function handleCategoryClick(id) {
    setOpenCategoryId((previousId) => (previousId === id ? null : id));

    setCartOpen(false);
    setUserModalOpen(false);
    setOpenHamberMenu(false);
  }

  // Toggle the user dropdown.
  function handleUserClick() {
    setUserModalOpen((previous) => !previous);
    setCartOpen(false);
    setOpenCategoryId(null);
    setOpenHamberMenu(false);
  }

  // Toggle the cart dropdown.
  function handleCartClick() {
    setCartOpen((previous) => !previous);
    setUserModalOpen(false);
    setOpenCategoryId(null);
    setOpenHamberMenu(false);
  }

  // Toggle the mobile menu.
  function handleHamburgerClick() {
    setOpenHamberMenu((previous) => !previous);
    setCartOpen(false);
    setUserModalOpen(false);
    setOpenCategoryId(null);
  }

  // Calculate the total cart price.
  const total = cart.reduce((sum, item) => {
    const price = Number(item.priceUsd ?? item.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  // Get unique product categories.
  const categories = [...new Set(products.map((product) => product.category))];

  // Navigate to checkout or login.
  function handleCheckout() {
    setCartOpen(false);
    setUserModalOpen(false);
    setOpenCategoryId(null);
    setOpenHamberMenu(false);

    navigate(user ? "/checkout" : "/Login");
  }

  function handleLogout() {
    setUserModalOpen(false);
    setCartOpen(false);
    setOpenCategoryId(null);
    setOpenHamberMenu(false);

    logout();
    navigate("/Login");
  }

  return (
    <header className="fixed top-0 z-9999 w-full bg-white">
      <div className="container mx-auto flex w-full items-center justify-between px-9 py-2.5 text-center max-lg:px-0 max-sm:px-5">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setCartOpen(false);
            setUserModalOpen(false);
            setOpenCategoryId(null);
            setOpenHamberMenu(false);
          }}
        >
          <div className="flex flex-row items-center gap-1.5">
            <h2 className="text-[24px] font-bold text-[#0559F9] max-lg:text-[18px]">
              Beni Shop
            </h2>

            <AiOutlineShopping
              className="text-5xl max-lg:text-3xl"
              color="#0559F9"
            />
          </div>
        </Link>

        {/* Desktop categories */}
        <div
          ref={categoryRef}
          className="flex items-center gap-8 max-md:hidden"
        >
          {categories.map((category) => (
            <CartContext.Provider
              key={category}
              value={{
                item: category,
                id: category,
                setvalue: handleCategoryClick,
                openMenu: openCategoryId,
                products,
              }}
            >
              <HeadShowWhatWeSell />
            </CartContext.Provider>
          ))}
        </div>

        {/* Mobile menu trigger and dropdown */}
        <div className="relative md:hidden">
          <button
            type="button"
            aria-label={openHamberMenu ? "Close menu" : "Open menu"}
            aria-expanded={openHamberMenu}
            onClick={handleHamburgerClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            {openHamberMenu ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>

          <HamberMenu
            isOpen={openHamberMenu}
            categories={categories}
            products={products}
            onClose={() => setOpenHamberMenu(false)}
          />
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative flex items-center">
          {user ? (
            <button
              type="button"
              aria-expanded={userModalOpen}
              onClick={handleUserClick}
              className="mr-5 inline-flex cursor-pointer items-center gap-1 text-[18px] font-medium uppercase text-[#2563EB] transition-colors duration-300 hover:text-[#114EF7] sm:mr-15"
            >
              {user.username}
              <MdArrowDropDown />
            </button>
          ) : (
            <Link
              to="/Login"
              onClick={() => {
                setUserModalOpen(false);
                setCartOpen(false);
                setOpenCategoryId(null);
                setOpenHamberMenu(false);
              }}
              className="group relative mr-5 inline-flex items-center gap-1 text-[14px] font-medium text-[#2563EB] transition-colors duration-300 hover:text-[#114EF7] sm:mr-15"
            >
              Login /<span className="font-bold">Sign up</span>
              <span className="absolute -bottom-1 right-0 h-0.5 w-0 rounded-full bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
            </Link>
          )}

          {/* User dropdown */}
          {user && userModalOpen && (
            <div className="absolute right-0 top-full z-10000 mt-2 flex h-auto w-36 flex-col items-center rounded-b-md border-t-2 border-blue-600 bg-white text-center shadow-lg">
              <ul className="w-full">
                <li className="w-full p-2.5 text-[16px] font-normal transition-colors hover:bg-blue-100 hover:text-[#4343ff]">
                  داشبورد
                </li>

                <li className="w-full p-2.5 text-[16px] font-normal transition-colors hover:bg-blue-100 hover:text-[#4343ff]">
                  <Link
                    to="/"
                    className="block w-full"
                    onClick={() => setUserModalOpen(false)}
                  >
                    سبد خرید
                  </Link>
                </li>

                <li className="w-full p-2.5 text-[16px] font-normal transition-colors hover:bg-blue-100 hover:text-[#4343ff]">
                  <button
                    type="button"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    خروج
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Cart trigger and dropdown */}
        <div ref={cartRef} className="relative flex items-center">
          <button
            type="button"
            aria-expanded={cartOpen}
            aria-label="Toggle shopping cart"
            onClick={handleCartClick}
            className="relative flex cursor-pointer items-center gap-1.5"
          >
            <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[12px] text-white">
              {cart.length}
            </span>

            <h5 className="text-[18px] font-bold text-[#0559F9]">Cart</h5>

            <IoCartOutline size={20} />
          </button>

          {/* Cart dropdown */}
          {cartOpen && cart.length > 0 && (
            <div className="absolute right-0 top-full z-9998 mt-3 flex w-170 max-w-[90vw] flex-col rounded-[20px] bg-white shadow-[0_1px_12px_rgba(0,0,0,0.16)] max-md:w-[min(540px,90vw)]">
              <div className="flex items-center justify-between px-5 py-3 sm:px-10">
                <span className="text-[16px] font-medium sm:text-[18px]">
                  Shopping Cart ({cart.length})
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/");
                  }}
                  className="text-[14px] font-semibold text-[#1755F8]"
                >
                  View Cart
                </button>
              </div>

              {/* Cart products */}
              <div className="max-h-[55vh] overflow-y-auto" data-lenis-prevent>
                {cart.map((item) => (
                  <ShoppingCart key={item.id} item={item} />
                ))}
              </div>

              {/* Cart total */}
              <div className="flex  w-full items-center justify-between border-t border-[#EFF1F6] px-5 py-4 sm:px-10">
                <span className="text-[16px] font-medium sm:text-[18px]">
                  Total:
                </span>

                <span className="text-[16px] font-bold text-[#2C65E5]">
                  <span className="text-[16px] font-bold text-[#2C65E5]">
                    $
                    {total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
              </div>

              {/* Cart actions */}
              <div className="flex gap-3 px-5 py-3 sm:gap-5 sm:px-10">
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="w-full rounded-[20px] border border-gray-300 py-2.5 text-[#1850E3]"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full cursor-pointer rounded-[20px] bg-[#1850E3] py-2.5 text-[16px] font-medium text-white sm:text-[20px]"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
