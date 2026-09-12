import React, { Component } from "react";
import { useState } from "react";
import { GiClothes } from "react-icons/gi";
import { GiForestCamp } from "react-icons/gi";
import { FaDigitalTachograph } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "./context";

function HeadShowWhatWeSell() {
  const { item, id, products, openMenu, setvalue } = useContext(CartContext);

  const categoryProducts = products.filter(
    (product) => product.category === item,
  );

  return (
    <>
      <div className="relative inline-flex items-center  ">
        <div className="flex gap-2.5 items-center flex-row-reverse line-clamp-1  ">
          <span
            className={`font-bold text-[15px] cursor-pointer  ${
              openMenu === id ? "text-[#0559F9]" : "text-black"
            }`}
            onClick={() => setvalue(id)}
          >
            {item}
          </span>
        </div>

        <div
          className={
            openMenu === id
              ? "w-90 h-auto  line-clamp-1  z-9999 duration-200 delay-150 rounded-b-md absolute items-start text-center px-5.5   shadow-[0_35px_35px_rgba(0,0,0,0.25)]  border-t-2 border-blue-600 top-10 bg-[#ffffff] flex flex-col gap-2.5 "
              : "opacity-0 -z-1  absolute"
          }
        >
          {categoryProducts.map((product) => {
            return (
              <span
                key={product.id}
                className="flex items-center text-center gap-5   cursor-pointer line-clamp-1  W-20 h-20  hover:text-[#6868ff]"
              >
                <img className="w-15 h-15" src={product.image}></img>
                <span className="line-clamp-2 text-left">{product.title}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default HeadShowWhatWeSell;
