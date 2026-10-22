import React, { Component } from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { data, Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "./context";
import useAppStore from "./store/useZustand";

function Product({ data }) {
  const { item, toAdd, plus, minus } = useContext(CartContext);

  const [productQuantity, setProductQuantity] = useState([]);
  const [them, setThem] = useState("");

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useAppStore();

  const handleToggleCart = () => {
    const isInCart = cart.some((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      removeFromCart(item.id);
      setThem("");
    } else {
      addToCart(item);

      setThem("bg-green text-[#114EF7]");
    }
  };

  // const counterHandlerPlus = () => {
  //   plus(item);
  // };

  // const counterHandlerMinus = () => {
  //   minus(item);
  // };

  return (
    <>
      <div className=" bg-[#ffffff]  h-90 max-lg:h-70 w-full rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.16)]   flex flex-col justify-between   ">
        <div className="flex justify-center items-center  flex-col  ">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.image}
              className="w-40 h-40 mb-5 max-lg:w-30 max-lg:h-30   max-sm:w-30  max-sm:20  cursor-pointer  items-center flex  rounded-[10px]"
            />
          </Link>

          <div className=" flex   pb-2 pt-2 px-3.5 justify-between border-t  border-[#EFF1F6]  w-full">
            <div className="flex flex-col w-full justify-between">
              <div className="flex  gap-2.5 justify-between ">
                <div className="flex flex-3 items-center justify-start gap-1.5 max-2xl:gap-1  max-lg:flex-wrap text-center ">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index + 1 <= item.rating.rate
                          ? "text-yellow-400 max-lg:text-[10px] max-2xl:text-[12px]  max-xl:text-[14px] max-md:text-[12px]"
                          : "text-gray-300  max-lg:text-[10px] max-2xl:text-[12px]  max-xl:text-[14px] max-md:text-[12px]"
                      }
                    />
                  ))}
                  <span className="text-gray text-[14px] flex justify-end max-sm:text-[12px] font-extralight ">
                    ({item.rating.rate})
                  </span>
                </div>
                <h1 className=" font-bold text-[16px] py-1.5 max-lg:text-[14px] text-[#114EF7]">
                  {Number(item.priceIrr ?? item.price).toLocaleString("fa-IR")}{" "}
                  تومان
                </h1>
              </div>

              <h1 className=" font-bold ]max-sm:text-[14px] text-[16px] max-lg:text-[12px]  max-[500px]:text-[10px]! text-black  w-full  py-0.5 line-clamp-2 ">
                {item.title}
              </h1>

              <span className="text-gray-600 font-medium text-[14px] ">
                {[
                  item.ram,

                  item["CPU"],

                  item.Hz,

                  item["USB port"],
                  item.size,
                  item.brand,
                  item.Capacity,

                  item.hard,
                  item.color,
                ]
                  .filter(Boolean)
                  .join(" - ")}
              </span>
            </div>
          </div>
        </div>

        <div className=" gap-10 items-center text-center flex justify-between   border-t  border-[#EFF1F6]   w-full rounded-t-[10px]">
          <button
            className={
              them === "bg-green text-[#114EF7]"
                ? "bg-[#ffffff4e]  cursor-pointer border border-[blue] p-1.5 duration-100 delay-100 rounded-b-[7px] text-[#0084ff] text-[14px] gap-2.5 w-full items-center text-center flex justify-center  "
                : " cursor-pointer bg-[#0257EF] p-1.5 rounded-b-[7px] text-[#CEE7FE] text-[14px] gap-2.5 w-full items-center text-center flex justify-center  "
            }
            onClick={handleToggleCart}
          >
            {them === "bg-green text-[#114EF7]" ? (
              <FiMinus size={20} className="duration-200 delay-200" />
            ) : (
              <IoCartOutline size={25} className="duration-200 delay-200" />
            )}
            {them === "bg-green text-[#114EF7]" ? "Remove" : " Add To Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
export default Product;
