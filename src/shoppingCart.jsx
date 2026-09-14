import React, { Component } from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "./context";
import useAppStore from "./store/useZustand";

function ShoppingCart(item) {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useAppStore();

  console.log("item", item);
  console.log("Cart", cart);

  const handelDeleteCount = () => {
    removeFromCart(item.item.id);

    onDelet(item.id);
  };
  const counterHandlerPlus = () => {
    increaseQuantity(item.item.id);
  };

  const counterHandlerMinus = () => {
    decreaseQuantity(item.item.id);
  };

  const addToShopingCart = () => {
    toAdd(item.id);
  };

  return (
    <>
      <div className="flex container mx-auto py-3 px-6 max-md:px-10 w-full justify-start   ">
        <div className="  w-full h-30 gap-4 max-md:gap-0   rounded-[10px] flex   ">
          <img
            className="w-[20%] p-2.5 rounded-[10px]"
            src={item.item.image}
            alt="product image"
          />
          <div className=" flex     border-b justify-between  border-[#EFF1F6] w-full">
            <div className="flex flex-col justify-between">
              <h1 className=" font-bold text-[14px] line-clamp-2 ">
                {item.item.title}
              </h1>
              <h1 className="font-bold text-[12px]   "></h1>
              <div className=" gap-10 items-center text-center flex justify-between pb-3   border-t  border-[#EFF1F6] mx-auto   w-full rounded-[10px]">
                <div className="flex items-center gap-5     flex-row-reverse text-center justify-between  rounded-[5px]">
                  <button
                    className="bg-[#F6F7F9] p-2"
                    onClick={counterHandlerPlus}
                  >
                    <GoPlus />
                  </button>
                  <span min="0" className="bg-white">
                    {item.item.quantity}
                  </span>
                  <button
                    className="bg-[#F6F7F9] p-2"
                    onClick={counterHandlerMinus}
                  >
                    <FiMinus />
                  </button>
                </div>
              </div>
            </div>

            <h1 className="px-2.5 flex items-end font-bold text-[16px] ml-30 py-3 text-[#2C65E5] ">
              ${item.item.price.toLocaleString()}
            </h1>
          </div>

          <div className=" ml-5 max-md:ml-0 gap-22 items-center text-center cursor-pointer flex justify-center py-5  px-5  w-[25%] rounded-[10px]">
            <button
              className=" cursor-pointer gap-2.5   text-black text-[24px] items-center text-center flex justify-center  "
              onClick={handelDeleteCount}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShoppingCart;
