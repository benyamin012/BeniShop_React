import React, { Component } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "./context";
import { BsTruck } from "react-icons/bs";
import { LuShieldCheck } from "react-icons/lu";
import { FaArrowsRotate } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLock } from "react-icons/io";

function FooterPart() {
  return (
    <>
      <div className="container grid grid-cols-4 max-lg:grid-cols-2  my-10  max-lg:my-5 max-lg:h-full items-center justify-between text-center px-9 max-lg:px-5 w-full h-25 rounded-lg mx-auto">
        <div className="flex max-sm:flex-col max-lg:py-2.5 items-center text-center justify-center ">
          <BsTruck
            className="bg-[#E5EEFE] w-20 h-20  p-5 max-xl:w-15 max-xl:h-15 max-xl:p-2.5 max-md:w-20  max-md:p-2   rounded-[9px]"
            color="#0658F5"
          />
          <div className="flex flex-col items-start max-sm:items-center text-center px-5 gap-3 mt-1.5">
            <h5 className="font-bold text-[16px] max-sm:text-[14px]">
              Free Shipping
            </h5>
            <span className="font-medium text-gray-400 text-[14px] text-start items-start gap-2.5 max-sm:text-center max-sm:text-[12px] ">
              Free shipping on
              <p>all orders above $50</p>
            </span>
          </div>
        </div>

        <div className="flex max-sm:flex-col max-lg:py-2.5 items-center text-center  justify-center ">
          <LuShieldCheck
            className="bg-[#E5EEFE] w-20 h-20  p-5 max-xl:w-15 max-xl:h-15 max-xl:p-2.5 max-md:w-20  max-md:p-2   rounded-[9px]"
            color="#0658F5"
          />
          <div className="flex flex-col items-start max-sm:items-center text-center px-5 gap-3 mt-1.5">
            <h5 className="font-bold text-[16px] max-sm:text-[14px]">
              Secure Payment
            </h5>
            <span className="font-medium text-gray-400 text-[14px] text-start items-start gap-2.5 max-sm:text-center max-sm:text-[12px]">
              100% secure payment
              <p>guarantee</p>
            </span>
          </div>
        </div>

        <div className="flex max-sm:flex-col max-lg:py-2.5 items-center text-center  justify-center">
          <FaArrowsRotate
            className="bg-[#E5EEFE] w-20 h-20  p-5 max-xl:w-15 max-xl:h-15 max-xl:p-2.5 max-md:w-20  max-md:p-2   rounded-[9px]"
            color="#0658F5"
          />
          <div className="flex flex-col items-start max-sm:items-center text-center px-5 gap-3 mt-1.5">
            <h5 className="font-bold text-[16px] max-sm:text-[14px]">
              Easy Returns
            </h5>
            <span className="font-medium text-gray-400 text-[14px] text-start items-start gap-2.5 max-sm:text-center max-sm:text-[12px]">
              30 days easy return
              <p>policy</p>
            </span>
          </div>
        </div>

        <div className="flex max-sm:flex-col max-lg:py-2.5 items-center text-center  justify-center ">
          <TfiHeadphoneAlt
            className="bg-[#E5EEFE] w-20 h-20  p-5 max-xl:w-15 max-xl:h-15 max-xl:p-2.5 max-md:w-20  max-md:p-2   rounded-[9px]"
            color="#0658F5"
          />
          <div className="flex flex-col items-start max-sm:items-center text-center px-5 gap-3 mt-1.5">
            <h5 className="font-bold text-[16px] max-sm:text-[14px]">
              24/4 Support
            </h5>
            <span className="font-medium text-gray-400 text-[14px] text-start items-start gap-2.5 max-sm:text-center max-sm:text-[12px]">
              dedicted support
              <p>around the clock</p>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#02255F] w-full h-40 max-sm:flex-wrap  justify-between items-center text-center flex mx-auto px-55 max-xl:px-10">
        <div className="flex gap-2.5 items-center text-center max-sm:flex-col justify-center  ">
          <IoIosLock
            className="border w-10 h-10  flex items-center max-lg-p-0 max-lg:border-none max-lg:shadow-none text-center  justify-center rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] border-white p-1.5  "
            color="white"
          />
          <h2 className="font-bold text-[18px] text-white flex items-center text-center gap-1.5 max-lg:text-[14px]">
            Made With <FaHeart color="white" /> by Benyamin
          </h2>
        </div>
        <div className="flex gap-1.5 items-center text-center flex-row-reverse">
          <h2 className="font-bold text-white text-[24px] max-lg:text-[18px]">
            Beni Shop
          </h2>
          <AiOutlineShopping
            className="text-5xl max-lg:text-3xl"
            color="white"
          />
        </div>
        <div className="flex gap-2.5 items-center text-center">
          <div className="w-10 h-10 max-lg:w-7 max-lg:h-7 flex items-center text-center  justify-center rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] bg-[#ffffff] ">
            <GrFacebookOption size={30} className="p-1" color="gray" />
          </div>
          <div className="w-10 h-10 max-lg:w-7 max-lg:h-7 flex items-center text-center  justify-center  rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] bg-[#ffffff] ">
            <FaTwitter size={30} className="p-1" color="gray" />
          </div>
          <div className="w-10 h-10 max-lg:w-7 max-lg:h-7 flex items-center text-center  justify-center rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] bg-[#ffffff] ">
            <GrInstagram size={30} className="p-1" color="gray" />
          </div>
          <div className="w-10 h-10 max-lg:w-7 max-lg:h-7 flex items-center text-center  justify-center rounded-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.20)] bg-[#ffffff] ">
            <FaLinkedinIn size={30} className="p-1" color="gray" />
          </div>
        </div>
      </div>
    </>
  );
}
export default FooterPart;
