import React, { Component } from "react";
// import trashIcon from "../img/icons8-trash-60.png";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import HeadShowWhatWeSell from "./headShowProductFildPart";
import useAppStore from "./store/useZustand";

function HamberMenu({ className, categories }) {
  //   console.log("cart in hamber Menu:", cart);

  return (
    <>
      <div
        className={`  fixed   bg-[#ffffffa6] backdrop-blur-[10px] p-2 w-full
         duration-400   md:hidden rounded-r-[10px] h-svh shadow-[0_1px_4px_rgba(0,0,0,0.26)] ${className} `}
      >
        <div className="container  mx-auto   ">
          <header className="flex  justify-between px-5  w-full header-font">
            <div className="head flex-col px-3 w-full flex items-start gap-15 text-center justify-between">
              <div className="ul  dark:text-white">
                <ul className="flex flex-col decoration-0 max-xl:gap-5 text-black items-start text-start  gap-10">
                  {categories.map((category, i) => (
                    <i key={i}>{category}</i>
                  ))}
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
export default HamberMenu;
