import { data, useParams } from "react-router-dom";
import HeadShowWhatWeSell from "./headShowProductFildPart";
import FooterPart from "./footer";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { CartContext } from "./context";
import { Link } from "react-router-dom";
import useAppStore from "./store/useZustand";
import ProductDetailLoading from "./CartDetailsLoader";
import { IoCartOutline } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { LuShieldCheck } from "react-icons/lu";
import { FaArrowsRotate } from "react-icons/fa6";
function CartDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useAppStore();

  const quantity =
    cart.find((item) => Number(item.id) === Number(id))?.quantity ?? 0;

  const isInCart = cart.some((item) => Number(item.id) === Number(id));

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(Number(id));
    } else if (product) {
      addToCart(product);
    }
  };
  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${id}`,
        );

        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return <ProductDetailLoading />;
  } else {
    return (
      <>
        <div className="shadow-[0_1px_4px_rgba(0,0,0,0.16)] py-3 max-lg:mt-2.5 items-start max-md:w-[95%] max-sm:flex-wrap container mx-auto px-2.5 max-sm:px-0 max-sm:w-full flex rounded-[10px] ">
          <div className=" py-3 items-start max-md:w-[95%] max-sm:flex-col container mx-auto px-2.5 flex rounded-[10px]">
            <div className="w-[30%] max-sm:w-[60%] max-sm:items-center max-sm:mx-auto">
              <img
                src={product.image}
                className=" bg-[#F8F9FA]  cursor-pointer  rounded-[10px]"
              />
            </div>

            <div className="flex flex-col gap-2.5 p-5 w-[40%] max-sm:items-start max-sm:text-start max-sm:mx-0  mx-auto ">
              <h1 className="font-normal   text-[24px] max-lg:text-[20px] max-md:text-[16px] max-sm:text-[18px]  ">
                {product.title}
              </h1>

              <div className="flex  items-center justify-start gap-1.5 text-[24px]  text-center ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index + 1 <= product.rating.rate
                        ? "text-yellow-400 max-lg:text-[16px] max-md:text-[14px]"
                        : "text-gray-300 max-lg:text-[16px] max-md:text-[14px]"
                    }
                  />
                ))}
                <span className="text-gray text-[16px] text-[#0e61f4] font-bold flex justify-end max-xl:text-[12px] max-md:text-[14px] max-sm:text-[12px] ">
                  ({product.rating.rate})
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-black text-[26px] text-[#0E61F4] max-xl:text-[20px] max-lg:text-[16px] max-md:text-[16px]">
                  <h1 className=" font-bold font-iranyekan text-[16px] py-1.5 max-lg:text-[14px] text-[#114EF7]">
                    <h1 className="font-bold font-iranyekan text-[22px] py-1.5 max-lg:text-[14px] text-[#114EF7]">
                      {product.priceUsd != null
                        ? `$${Number(product.priceUsd).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "قیمت نامشخص"}
                    </h1>
                  </h1>
                </span>
                <span className="text-sm text-gray-500">
                  {product.priceUsd != null
                    ? `International: ${Number(product.priceUsd).toLocaleString("en-US")}`
                    : "قیمت بین‌المللی هنوز تعیین نشده است"}
                </span>
              </div>
              <div className="border-t border-t-gray py-5 mt-5 flex flex-col gap-1.5">
                <span className="font-medium text-[20px]  py-1 max-2xl:line-clamp-3 max-xl:text-[18px] max-sm:text-[16px] ">
                  Description :{" "}
                  <span className=" block font-normal text-[16px]    max-xl:w-78 max-lg:text-[14px] max-sm:text-[10px]  text-justify  max-sm:w-45 max-md:w-60  ">
                    {product.descriptionFa ||
                      product.description ||
                      "توضیحی برای این محصول ثبت نشده است."}
                  </span>
                </span>
                {/* <p className="line-clamp-2 max-xl:line-clamp-1 max-xl:w-78 max-lg:text-[14px] max-sm:text-[10px] max-sm:w-45 max-md:w-60 "></p> */}
              </div>
              <div className=" gap-2.5 items-start text-start  max-md:gap-1 w-60 max-sm:w-40 max-sm:gap-2.5  ">
                <span className="font-medium text-[16px] max-lg:text-[16px] max-md:text-[11px] max-sm:text-[14px] ">
                  Category :{" "}
                  <span className="font-semibold text-[16px] text-[gray] max-md:text-[11px] max-xl:text-[12px] max-sm:text-[12px]">
                    {" "}
                    {product.category}{" "}
                  </span>
                </span>
                {/* <span className="font-semibold text-[16px] text-[gray] max-md:text-[11px] max-xl:text-[12px] max-sm:text-[12px]"></span> */}
              </div>
            </div>
          </div>
          <div className="shadow-[0_1px_4px_rgba(0,0,0,0.16)] p-5 py-5 w-[30%] max-md:items-center max-md:text-center max-sm:w-[60%] max-sm:items-center max-sm:mx-auto  rounded-[10px] sticky top-20 gap-2.5 ">
            <div className=" w-full  ">
              <div className=" text-start ">
                <div className="flex  gap-3">
                  <div>
                    <IoShieldCheckmarkOutline
                      className=" w-12 h-12 max-lg:w-8 max-lg:h-8 max-lg:p-1  flex items-center text-center border border-[#a6baec4b] justify-center rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] bg-[#a6baec4b] p-2.5  "
                      color="#1850e3"
                    />
                  </div>
                  <div className="flex items-start  flex-col   text-center justify-between rounded-[10px]">
                    <span className="text-[#14AA6D] font-semibold text-[16px] max-lg:text-[14px]">
                      In Stock
                    </span>
                    <span className="text-gray-500 font-light text-[14px] max-lg:text-[12px]">
                      Ready to ship
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full  justify-start items-start text-start  gap-1.5 py-3.5">
                <button
                  className={
                    isInCart
                      ? "bg-[#ffffff4e] cursor-pointer border border-[blue] p-1.5 duration-100 rounded-b-[7px] text-[#0084ff] text-[14px] gap-2.5 w-full items-center text-center flex justify-center"
                      : "cursor-pointer bg-[#0257EF] p-1.5 rounded-b-[7px] text-[#CEE7FE] text-[14px] gap-2.5 w-full items-center text-center flex justify-center"
                  }
                  onClick={handleToggleCart}
                >
                  {isInCart ? (
                    <FiMinus size={20} />
                  ) : (
                    <IoCartOutline size={25} />
                  )}

                  {isInCart ? "Remove" : "Add To Cart"}
                </button>
                <Link
                  to={"/"}
                  className=" text-[#1850e3]  w-full  rounded-[10px] py-1.5"
                >
                  <button className="border cursor-pointer  text-[#1850e3] border-gray w-full text-[18px] max-md:text-[12px font-normal max-lg:text-[14px] max-sm:text-[10px] max-xl:p-2.5 max-xl:text-[16px] rounded-[10px] py-3.5">
                    Back To Shop
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartDetails;
